import axios from "axios";
import crypto from "crypto";

// ⚠️ đưa vào .env cho an toàn
const partnerCode = process.env.MOMO_PARTNER_CODE;
const accessKey = process.env.MOMO_ACCESS_KEY;
const secretKey = process.env.MOMO_SECRET_KEY;

export const createPayment = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    const requestId = partnerCode + new Date().getTime();
    const orderInfo = "Thanh toán đơn hàng";

    const redirectUrl = `${process.env.CLIENT_URL}/payment-success`;
    const ipnUrl = `${process.env.SERVER_URL}/api/momo/ipn`;

    const requestType = "captureWallet";
    const extraData = "";

    const rawSignature =
      `accessKey=${accessKey}` +
      `&amount=${amount}` +
      `&extraData=${extraData}` +
      `&ipnUrl=${ipnUrl}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${partnerCode}` +
      `&redirectUrl=${redirectUrl}` +
      `&requestId=${requestId}` +
      `&requestType=${requestType}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData,
      requestType,
      signature,
      lang: "vi"
    };

    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Create payment failed" });
  }
};

export const handleIPN = (req, res) => {
  const data = req.body;

  console.log("IPN:", data);

  if (data.resultCode === 0) {
    console.log("✅ Thanh toán thành công:", data.orderId);

    // TODO: update order DB
  } else {
    console.log("❌ Thanh toán thất bại");
  }

  res.status(200).json({ message: "OK" });
};