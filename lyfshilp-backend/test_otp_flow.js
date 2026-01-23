import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Native fetch (Node 18+)

const BASE_URL = 'http://localhost:4000/api/career-guidance';
const PHONE = '9999999999';

async function runTest() {
    console.log('🚀 Starting OTP Verification Test...\n');

    // 1. Send OTP
    console.log('1️⃣  Sending OTP...');
    const sendRes = await fetch(`${BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: PHONE })
    });
    const sendData = await sendRes.json();
    console.log('Response:', sendData);

    let otp = sendData.devOtp;

    if (!otp) {
        console.log('⚠️ devOtp not returned (Production Mode?). Fetching from DB...');
        const record = await prisma.otpRecord.findUnique({ where: { phone: PHONE } });
        if (record) {
            otp = record.otp;
            console.log(`✅  Fetched OTP from DB: ${otp}`);
        } else {
            console.error('❌ Failed to fetch OTP from DB');
            return;
        }
    } else {
        console.log(`✅ OTP Received: ${otp}\n`);
    }

    // 2. Verify OTP
    console.log('2️⃣  Verifying OTP...');
    const verifyRes = await fetch(`${BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: PHONE, otp })
    });
    const verifyData = await verifyRes.json();
    console.log('Response:', verifyData);

    if (!verifyData.success || !verifyData.token) {
        console.error('❌ Verification failed or no token received');
        return;
    }
    const token = verifyData.token;
    console.log(`✅ Verified! Token: ${token}\n`);

    // 3. Access Protected Route (Eligible Courses)
    console.log('3️⃣  Accessing Protected Route (Eligible Courses)...');
    const searchRes = await fetch(`${BASE_URL}/eligible-courses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-otp-session-token': token
        },
        body: JSON.stringify({
            state: 'Delhi',
            preferredCategory: 'Engineering',
            class12Subjects: ['Physics', 'Mathematics', 'Chemistry'],
            interestedSubjects: ['Computer Science'],
            openToOutsideState: false
        })
    });
    const searchData = await searchRes.json();

    if (searchData.success) {
        console.log(`✅ Search Successful! Found ${searchData.data.pagination.totalEligibleCourses} courses.`);
    } else {
        console.log('❌ Search Failed:', searchData);
    }

    // 4. Test Invalid Token
    console.log('\n4️⃣  Testing Invalid Token...');
    const invalidRes = await fetch(`${BASE_URL}/eligible-courses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-otp-session-token': 'invalid-token'
        },
        body: JSON.stringify({
            state: 'Delhi',
            preferredCategory: 'Engineering',
            class12Subjects: ['Physics'],
            interestedSubjects: ['CS']
        })
    });
    const invalidData = await invalidRes.json();
    if (invalidRes.status === 401) {
        console.log('✅ Correctly rejected invalid token (401 Unauthorized)');
    } else {
        console.log('❌ Failed to reject invalid token:', invalidData);
    }
}

runTest().catch(console.error);
