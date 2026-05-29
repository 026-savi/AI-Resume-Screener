from PyPDF2 import PdfReader
from docx import Document

def parse_resume(path):

    if path.endswith(".pdf"):

        reader = PdfReader(path)

        text = ""

        for page in reader.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text

        return text

    elif path.endswith(".docx"):

        doc = Document(path)

        text = ""

        for para in doc.paragraphs:

            text += para.text

        return text

    return ""