import pdfplumber
import pandas as pd
import re
from io import BytesIO

def parse_pdf(file_bytes: bytes):
    full_text = extract_text_from_bytes(file_bytes)

    df = _parse_gpay_from_text(full_text)

    return df, "Google Pay", full_text


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