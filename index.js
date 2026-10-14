const express = require('express');
const axios = require('axios');
const https = require('https');

const app = express();
app.use(express.json());

const BASE_URL = 'https://alamat.thecloudalert.com/api';

// HTTPS agent untuk mengabaikan kendala sertifikat SSL dari server publik
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

app.post('/cekAlamat', async (req, res) => {
    try {
        const { provinsi, kabkota } = req.body;
        if (!provinsi || !kabkota) {
            return res.status(400).json({ code: "0", message: "Provinsi dan kabkota diperlukan." });
        }

        const provResponse = await axios.get(`${BASE_URL}/provinsi/get/`, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            httpsAgent: httpsAgent
        });

        const provList = provResponse.data?.result || [];
        const foundProv = provList.find(p => p.text && p.text.toLowerCase() === provinsi.trim().toLowerCase());

        if (!foundProv) {
            return res.json({ code: "0", message: "Tidak Sesuai" });
        }

        const cityResponse = await axios.get(`${BASE_URL}/kabkota/get/?d_provinsi_id=${foundProv.id}`, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            httpsAgent: httpsAgent
        });

        const cityList = cityResponse.data?.result || [];

        const foundCity = cityList.find(c => c.text && c.text.toLowerCase() === kabkota.trim().toLowerCase());

        if (foundCity) {
            return res.json({ code: "1", message: "Sesuai" });
        } else {
            return res.json({ code: "0", message: "Tidak Sesuai" });
        }

    } catch (error) {
        console.error("Detail Error:", error.response ? `${error.response.status} - ${error.response.statusText}` : error.message);
        return res.status(500).json({ code: "0", message: "Error dari server" });
    }
});

app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});