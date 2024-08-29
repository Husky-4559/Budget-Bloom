import React, { useEffect, useState, useCallback } from "react";
import { fetchCurrencyRates } from "../services/currencyService";

const currencyData = {
	USD: "United States Dollar",
	EUR: "Euro",
	GBP: "British Pound Sterling",
	JPY: "Japanese Yen",
	AUD: "Australian Dollar",
	CAD: "Canadian Dollar",
	CHF: "Swiss Franc",
	CNY: "Chinese Yuan",
	INR: "Indian Rupee",
	BRL: "Brazilian Real",
	RUB: "Russian Ruble",
	ZAR: "South African Rand",
	NZD: "New Zealand Dollar",
	SEK: "Swedish Krona",
	NOK: "Norwegian Krone",
	DKK: "Danish Krone",
	SGD: "Singapore Dollar",
	HKD: "Hong Kong Dollar",
	MXN: "Mexican Peso",
	TRY: "Turkish Lira",
	KRW: "South Korean Won",
	THB: "Thai Baht",
	MYR: "Malaysian Ringgit",
	IDR: "Indonesian Rupiah",
	PHP: "Philippine Peso",
	PLN: "Polish Zloty",
	CZK: "Czech Koruna",
	HUF: "Hungarian Forint",
	RON: "Romanian Leu",
	ILS: "Israeli New Shekel",
	SAR: "Saudi Riyal",
	AED: "United Arab Emirates Dirham",
	ARS: "Argentine Peso",
	CLP: "Chilean Peso",
	COP: "Colombian Peso",
	EGP: "Egyptian Pound",
	NGN: "Nigerian Naira",
	PKR: "Pakistani Rupee",
	BDT: "Bangladeshi Taka",
	VND: "Vietnamese Dong",
	UAH: "Ukrainian Hryvnia",
	KZT: "Kazakhstani Tenge",
	KES: "Kenyan Shilling",
	GHS: "Ghanaian Cedi",
	TZS: "Tanzanian Shilling",
	UGX: "Ugandan Shilling",
	LKR: "Sri Lankan Rupee",
	BHD: "Bahraini Dinar",
	OMR: "Omani Rial",
	QAR: "Qatari Riyal",
	KWD: "Kuwaiti Dinar",
	BND: "Brunei Dollar",
	LKR: "Sri Lankan Rupee",
	MAD: "Moroccan Dirham",
	DZD: "Algerian Dinar",
	TND: "Tunisian Dinar",
	LBP: "Lebanese Pound",
	JOD: "Jordanian Dinar",
	IQD: "Iraqi Dinar",
	IRR: "Iranian Rial",
	LYD: "Libyan Dinar",
	SYP: "Syrian Pound",
	YER: "Yemeni Rial",
	BAM: "Bosnia-Herzegovina Convertible Mark",
	HRK: "Croatian Kuna",
	RSD: "Serbian Dinar",
	MKD: "Macedonian Denar",
	ISK: "Icelandic Krona",
	ALL: "Albanian Lek",
	MDL: "Moldovan Leu",
	BGN: "Bulgarian Lev",
	MNT: "Mongolian Tugrik",
	KGS: "Kyrgyzstani Som",
	UZS: "Uzbekistani Som",
	TMT: "Turkmenistani Manat",
	AZN: "Azerbaijani Manat",
	GEL: "Georgian Lari",
	AMD: "Armenian Dram",
	MUR: "Mauritian Rupee",
	NAD: "Namibian Dollar",
	ZMW: "Zambian Kwacha",
	MWK: "Malawian Kwacha",
	BWP: "Botswanan Pula",
	ZWL: "Zimbabwean Dollar",
	ETB: "Ethiopian Birr",
	DJF: "Djiboutian Franc",
	SOS: "Somali Shilling",
	SDG: "Sudanese Pound",
	MGA: "Malagasy Ariary",
	SCR: "Seychellois Rupee",
	MVR: "Maldivian Rufiyaa",
	XOF: "West African CFA Franc",
	XAF: "Central African CFA Franc",
	XCD: "East Caribbean Dollar",
	HTG: "Haitian Gourde",
	BSD: "Bahamian Dollar",
	BBD: "Barbadian Dollar",
	BZD: "Belize Dollar",
	KYD: "Cayman Islands Dollar",
	JMD: "Jamaican Dollar",
	TTD: "Trinidad and Tobago Dollar",
	GIP: "Gibraltar Pound",
	FJD: "Fijian Dollar",
	SBD: "Solomon Islands Dollar",
	WST: "Samoan Tala",
	TOP: "Tongan Paʻanga",
	PGK: "Papua New Guinean Kina",
	VUV: "Vanuatu Vatu",
	KPW: "North Korean Won",
	MMK: "Myanmar Kyat",
	LAK: "Lao Kip",
	KHR: "Cambodian Riel",
	MOP: "Macanese Pataca",
	NPR: "Nepalese Rupee",
	BND: "Brunei Dollar",
	BMD: "Bermudian Dollar",
	ANG: "Netherlands Antillean Guilder",
	AWG: "Aruban Florin",
	SZL: "Swazi Lilangeni",
	LSL: "Lesotho Loti",
	GMD: "Gambian Dalasi",
	GNF: "Guinean Franc",
	CDF: "Congolese Franc",
	BIF: "Burundian Franc",
	RWF: "Rwandan Franc",
	AOA: "Angolan Kwanza",
	MZN: "Mozambican Metical",
	SLL: "Sierra Leonean Leone",
	CUP: "Cuban Peso",
	UYU: "Uruguayan Peso",
	PYG: "Paraguayan Guarani",
	BOB: "Bolivian Boliviano",
	PEN: "Peruvian Sol",
	VES: "Venezuelan Bolívar",
	GYD: "Guyanese Dollar",
	SRD: "Surinamese Dollar",
	HNL: "Honduran Lempira",
	NIO: "Nicaraguan Córdoba",
	CRC: "Costa Rican Colón",
	GTQ: "Guatemalan Quetzal",
	BZD: "Belize Dollar",
	JMD: "Jamaican Dollar",
	DOP: "Dominican Peso",
	HTG: "Haitian Gourde",
	TTD: "Trinidad and Tobago Dollar",
	BMD: "Bermudian Dollar",
	FKP: "Falkland Islands Pound",
	SHP: "Saint Helena Pound",
	ANG: "Netherlands Antillean Guilder",
	AWG: "Aruban Florin",
	XCD: "East Caribbean Dollar",
	BSD: "Bahamian Dollar",
	KYD: "Cayman Islands Dollar",
	SRD: "Surinamese Dollar",
	MVR: "Maldivian Rufiyaa",
	SYP: "Syrian Pound",
	ERN: "Eritrean Nakfa",
	XPF: "CFP Franc",
};

const CurrencyConverter = ({ onConvert }) => {
	const [rates, setRates] = useState({});
	const [amount, setAmount] = useState("");
	const [fromCurrency, setFromCurrency] = useState("USD");
	const [toCurrency, setToCurrency] = useState("EUR");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch currency rates when the component mounts
	useEffect(() => {
		const getRates = async () => {
			try {
				const fetchedRates = await fetchCurrencyRates();
				setRates(fetchedRates);
			} catch (err) {
				setError("Failed to fetch currency rates. Please try again later.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		getRates();
	}, []);

	// Function to handle currency conversion
	const convertCurrency = useCallback(() => {
		if (
			!rates[fromCurrency] ||
			!rates[toCurrency] ||
			isNaN(amount) ||
			amount === ""
		) {
			return "N/A";
		}

		const convertedAmount = (
			(amount / rates[fromCurrency]) *
			rates[toCurrency]
		).toFixed(2);

		// Pass the converted amount and currency back to parent component if needed
		if (onConvert) {
			onConvert(convertedAmount, toCurrency);
		}

		return convertedAmount;
	}, [amount, fromCurrency, toCurrency, rates, onConvert]);

	// Handle input validation
	const handleAmountChange = (e) => {
		const value = e.target.value;
		if (!isNaN(value) || value === "") {
			setAmount(value);
		}
	};

	// Conditional rendering based on loading or error states
	if (loading) return <p>Loading...</p>;
	if (error) return <p className="error">{error}</p>;

	return (
		<div className="currency-converter form-wrapper">
			<h2 className="h2">Currency Converter</h2>
			<div className="expense-inputs">
				<input
					type="number"
					value={amount}
					onChange={handleAmountChange}
					placeholder="Amount"
					min="0"
					step="0.01"
				/>
				<div className="select-group">
					<select
						value={fromCurrency}
						onChange={(e) => setFromCurrency(e.target.value)}
					>
						{Object.keys(currencyData).map((key) => (
							<option key={key} value={key}>
								{currencyData[key]} ({key})
							</option>
						))}
					</select>
					<span>to</span>
					<select
						value={toCurrency}
						onChange={(e) => setToCurrency(e.target.value)}
					>
						{Object.keys(currencyData).map((key) => (
							<option key={key} value={key}>
								{currencyData[key]} ({key})
							</option>
						))}
					</select>
				</div>
			</div>
			<p className="muted">
				Converted Amount: <span className="accent">{convertCurrency()}</span>{" "}
				{toCurrency}
			</p>
		</div>
	);
};

export default CurrencyConverter;
