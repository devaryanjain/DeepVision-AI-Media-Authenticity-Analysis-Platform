import os
from datetime import datetime
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet


def generate_report(result, output_path):

    styles = getSampleStyleSheet()

    doc = SimpleDocTemplate(output_path)

    elements = []

    elements.append(Paragraph("<b>DeepVision AI Analysis Report</b>", styles["Title"]))

    elements.append(Paragraph(f"Generated: {datetime.now()}", styles["Normal"]))
    elements.append(Paragraph("<br/>", styles["Normal"]))

    elements.append(
        Paragraph(f"<b>Prediction:</b> {result['prediction']}", styles["Normal"])
    )

    elements.append(
        Paragraph(f"<b>Confidence:</b> {result['confidence']}%", styles["Normal"])
    )

    elements.append(
        Paragraph(f"<b>SHA-256:</b> {result['sha256']}", styles["Normal"])
    )

    elements.append(Paragraph("<br/>", styles["Normal"]))

    elements.append(Paragraph("<b>Image Metadata</b>", styles["Heading2"]))

    metadata = result["metadata"]

    for key, value in metadata.items():
        elements.append(
            Paragraph(f"{key}: {value}", styles["Normal"])
        )

    doc.build(elements)

    return output_path