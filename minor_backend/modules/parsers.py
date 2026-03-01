import pdfplumber
import pandas as pd
import re
from io import BytesIO

def parse_pdf(file_bytes: bytes):
    full_text = extract_text_from_bytes(file_bytes)

    if "Google Pay" in full_text or "UPITransactionID" in full_text:
        df = _parse_gpay_from_text(full_text)
        return df, "Google Pay", full_text

    elif "PhonePe" in full_text:
        df = _parse_phonepe_from_text(full_text)
        return df, "PhonePe", full_text

    else:
        return None, "Unknown", full_text


def extract_text_from_bytes(file_bytes: bytes):
    text = ""
    with pdfplumber.open(BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text


def _parse_gpay_from_text(text):


    transactions = []
    lines = text.split("\n")

    for line in lines:

        if "₹" in line and ("Paidto" in line or "Receivedfrom" in line):

            match = re.search(
                r"(\d{2}\w{3},\d{4})\s+(Paidto|Receivedfrom)(.+?)\s+₹([\d,]+)",
                line
            )

            if match:
                date = match.group(1)
                raw_type = match.group(2)
                description = match.group(3).strip()
                amount = float(match.group(4).replace(",", ""))

                if raw_type == "Paidto":
                    txn_type = "debit"
                elif raw_type == "Receivedfrom":
                    txn_type = "credit"
                else:
                    txn_type = "unknown"

                transactions.append({
                    "date": date,
                    "type": txn_type,
                    "description": description,
                    "amount": amount,
                    "source": "Google Pay"
                })

    return pd.DataFrame(transactions)

def _parse_phonepe_from_text(text):

    transactions = []
    lines = text.split("\n")

    for line in lines:

        if "₹" in line and ("Paid to" in line or "Received from" in line):

            match = re.search(
                r"([A-Za-z]{3}\s\d{1,2},\s\d{4})\s+(Paid to|Received from)\s+(.*?)\s+(DEBIT|CREDIT)\s+₹([\d,]+)",
                line
            )

            if match:
                date = match.group(1)
                action = match.group(2)
                description = match.group(3).strip()
                txn_nature = match.group(4)
                amount = float(match.group(5).replace(",", ""))

                txn_type = txn_nature

                transactions.append({
                    "date": date,
                    "type": txn_type,
                    "description": description,
                    "amount": amount,
                    "source": "PhonePe"
                })

    return pd.DataFrame(transactions)