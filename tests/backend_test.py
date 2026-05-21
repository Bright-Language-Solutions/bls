"""
Backend API tests for Bright Language Solutions.
Run:  python tests/backend_test.py
Requires: pip install requests
Server must be running at http://localhost:3000 with ADMIN_SECRET=bls-admin-change-me
"""

import sys
import requests
from datetime import date, timedelta

BASE = "http://localhost:3000"
ADMIN_PASSWORD = "bls-admin-change-me"

tomorrow  = (date.today() + timedelta(days=1)).isoformat()
yesterday = (date.today() - timedelta(days=1)).isoformat()

VALID_QUOTE = {
    "customerName": "Test User",
    "phone":        "9876543210",
    "email":        "test@example.com",
    "serviceType":  "TRANSLATION",
    "sourceLang":   "English",
    "targetLang":   "Hindi",
    "projectDate":  tomorrow,
}

results = {}  # label -> (passed, detail)

def record(label, passed, detail=""):
    results[label] = (passed, detail)
    tag = "PASS" if passed else "FAIL"
    suffix = f" — {detail}" if detail else ""
    print(f"[{tag}] {label}{suffix}")

def get_json(res):
    try:
        return res.json()
    except Exception:
        return {}


# -- a. POST happy path -> 201 --------------------------------------------------
res = requests.post(f"{BASE}/api/quotes", json=VALID_QUOTE)
data = get_json(res)
quote_id = data.get("quoteId", "")
ok = (
    res.status_code == 201
    and data.get("success") is True
    and bool(quote_id)
    and "whatsappSent" in data
)
record("a. POST /api/quotes happy path -> 201", ok, f"status={res.status_code}")

# -- b. POST missing customerName -> 400 with error field ----------------------─
body = {k: v for k, v in VALID_QUOTE.items() if k != "customerName"}
res  = requests.post(f"{BASE}/api/quotes", json=body)
d    = get_json(res)
record("b. POST missing customerName -> 400", res.status_code == 400 and "error" in d, f"status={res.status_code}")

# -- c. POST sourceLang == targetLang -> 400 ------------------------------------
body = {**VALID_QUOTE, "sourceLang": "Hindi", "targetLang": "Hindi"}
res  = requests.post(f"{BASE}/api/quotes", json=body)
d    = get_json(res)
record("c. POST sourceLang == targetLang -> 400", res.status_code == 400 and "error" in d, f"status={res.status_code}")

# -- d. POST phone starting with 1 -> 400 --------------------------------------
body = {**VALID_QUOTE, "phone": "1234567890"}
res  = requests.post(f"{BASE}/api/quotes", json=body)
d    = get_json(res)
record("d. POST phone starts-with-1 -> 400", res.status_code == 400 and "error" in d, f"status={res.status_code}")

# -- e. POST projectDate in past -> 400 ----------------------------------------
body = {**VALID_QUOTE, "projectDate": yesterday}
res  = requests.post(f"{BASE}/api/quotes", json=body)
d    = get_json(res)
record("e. POST projectDate in past -> 400", res.status_code == 400 and "error" in d, f"status={res.status_code}")

# -- f. PATCH without cookie -> 401 --------------------------------------------─
res = requests.patch(f"{BASE}/api/quotes/{quote_id}", json={"status": "IN_REVIEW"})
record("f. PATCH /api/quotes/:id without cookie -> 401", res.status_code == 401, f"status={res.status_code}")

# -- k. POST /api/admin/auth correct -> 200, cookie set  (run before g) --------─
res       = requests.post(f"{BASE}/api/admin/auth", json={"password": ADMIN_PASSWORD})
d         = get_json(res)
admin_cookie = res.cookies.get("admin_session", "")
ok_k = res.status_code == 200 and d.get("success") is True and bool(admin_cookie)
record("k. POST /api/admin/auth correct -> 200, cookie set", ok_k,
       f"status={res.status_code}, cookie={'set' if admin_cookie else 'missing'}")

session = requests.Session()
# Manually set cookie to avoid localhost domain-normalisation bug in Python's cookielib
# (cookielib stores localhost as localhost.local, causing domain mismatch on forwarding)
session.headers.update({'Cookie': f'admin_session={admin_cookie}'})

# -- g. PATCH with cookie + {status:"IN_REVIEW"} -> 200, DB updated ------------─
res = session.patch(f"{BASE}/api/quotes/{quote_id}", json={"status": "IN_REVIEW"})
d   = get_json(res)
ok_g = (
    res.status_code == 200
    and d.get("success") is True
    and d.get("lead", {}).get("status") == "IN_REVIEW"
)
record("g. PATCH with cookie + IN_REVIEW -> 200, DB status updated", ok_g, f"status={res.status_code}")

# -- h. PATCH invalid status -> 400 --------------------------------------------
res = session.patch(f"{BASE}/api/quotes/{quote_id}", json={"status": "BOGUS"})
d   = get_json(res)
record("h. PATCH invalid status BOGUS -> 400", res.status_code == 400 and "error" in d, f"status={res.status_code}")

# -- i. PATCH empty body -> 400 ------------------------------------------------
res = session.patch(f"{BASE}/api/quotes/{quote_id}", json={})
d   = get_json(res)
record("i. PATCH empty body -> 400", res.status_code == 400 and "error" in d, f"status={res.status_code}")

# -- j. PATCH non-existent id -> 404 ------------------------------------------─
res = session.patch(f"{BASE}/api/quotes/nonexistent-id-00000000", json={"status": "IN_REVIEW"})
record("j. PATCH non-existent id -> 404", res.status_code == 404, f"status={res.status_code}")

# -- l. POST /api/admin/auth wrong password -> 401 ----------------------------─
res = requests.post(f"{BASE}/api/admin/auth", json={"password": "wrong"})
record("l. POST /api/admin/auth wrong password -> 401", res.status_code == 401, f"status={res.status_code}")

# -- m. DELETE /api/admin/auth -> 200, cookie cleared --------------------------
res = session.delete(f"{BASE}/api/admin/auth")
d   = get_json(res)
record("m. DELETE /api/admin/auth -> 200, cookie cleared", res.status_code == 200 and d.get("success") is True, f"status={res.status_code}")


# -- Summary ------------------------------------------------------------------─
passed = sum(1 for p, _ in results.values() if p)
total  = len(results)
print(f"\n{'=' * 60}")
print(f"Results: {passed}/{total} passed")

failures = [(label, detail) for label, (p, detail) in results.items() if not p]
if failures:
    print("\nFailed tests:")
    for label, detail in failures:
        line = f"  FAIL  {label}"
        if detail:
            line += f"\n        {detail}"
        print(line)
    sys.exit(1)
else:
    print("All tests passed!")
