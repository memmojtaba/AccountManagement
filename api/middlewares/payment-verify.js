module.exports = (req, res, next) => {
    try {
        var soap = require('soap');
        const payment_url = process.env.PAYMENT_URL
            || 'https://sandbox.zarinpal.com/pg/services/WebGate/wsdl';
        var options = {
            MerchantID: process.env.MERCHANT_ID || 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
            Authority: req.query.Authority,
            Amount: '10000'
        };
        console.log(options)
        soap.createClient(payment_url, (err, client) => {
            client.PaymentVerification(options, (err, result) => {
                var body = JSON.parse(JSON.stringify(result));
                console.log(body);
                req.paymentStatus = body.Status;
                req.paymentRefID = body.RefID;
                next();
            });
        });

    } catch {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}