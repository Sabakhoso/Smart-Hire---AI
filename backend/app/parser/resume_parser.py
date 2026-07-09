# Resume text extraction utilities
# Supports PDF and DOCX files. Focused solely on text extraction

import os

import pdfplumber
from docx import Document


def extract_text_from_pdf(file_path: str) -> str:
    """Extract plain text from a PDF file."""
    text_parts = []

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text_parts.append(page_text)

    return "\n".join(text_parts)


def extract_text_from_docx(file_path: str) -> str:
    """Extract plain text from a DOCX file."""
    document = Document(file_path)
    paragraphs = [para.text for para in document.paragraphs if para.text]
    return "\n".join(paragraphs)


def extract_resume_text(file_path: str) -> str:
    """
    Detect file type from extension and extract plain text accordingly.
    Raises ValueError for unsupported file types.
    """
    _, extension = os.path.splitext(file_path)
    extension = extension.lower()

    if extension == ".pdf":
        return extract_text_from_pdf(file_path)
    elif extension == ".docx":
        return extract_text_from_docx(file_path)
    else:
        raise ValueError(f"Unsupported file type: {extension}")