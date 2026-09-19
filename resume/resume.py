from fpdf import FPDF

def remove_non_ascii(text):
    return ''.join(char for char in text if ord(char) < 128)

# Initialize PDF
pdf = FPDF()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()
pdf.set_font("Arial", size=12)

# Define column width
left_x = 10
right_x = 110
col_width = 90
line_height = 6

def add_section(title, content, x_pos):
    pdf.set_xy(x_pos, pdf.get_y())
    pdf.set_font("Arial", style="B", size=12)
    pdf.cell(col_width, line_height, remove_non_ascii(title), ln=True)
    pdf.set_xy(x_pos, pdf.get_y())
    pdf.set_font("Arial", size=11)
    for line in content:
        pdf.set_xy(x_pos, pdf.get_y())
        pdf.cell(col_width, line_height, remove_non_ascii(line), ln=True)
    pdf.ln(3)

# Left Column
pdf.set_xy(left_x, pdf.get_y())
pdf.set_font("Arial", style="B", size=16)
pdf.cell(col_width, 10, remove_non_ascii("K. Boopathi"), ln=True)
pdf.set_font("Arial", style="I", size=12)
pdf.cell(col_width, 10, remove_non_ascii("MERN Stack Developer | Tech Blogger"), ln=True)
pdf.ln(5)

add_section("Contact Information", [
    "Tirunelveli, Tamil Nadu",
    "[Your Email] | [Your Phone]",
    "LinkedIn | GitHub | Portfolio | Blog"
], left_x)

add_section("Technical Skills", [
    "Programming: JavaScript, Python, Java, C, C++",
    "Web: HTML, CSS, React.js, Express.js",
    "Databases: MongoDB, Firebase, MySQL",
    "Other: Docker, Git, WebSockets, Meilisearch"
], left_x)

add_section("Education", [
    "B.E. CSE - Einstein College (2018-2022) | CGPA: 8.2/10",
    "Higher Secondary - Tilak Vidyalaya (2017-2018) | 76%"
], left_x)

# Right Column
pdf.set_xy(right_x, 10)
add_section("Experience", [
    "Full Stack Developer - Klenty (2022-Present)",
    "- Built new features and fixed bugs.",
    "- Transitioned to infrastructure team.",
    "- Worked on scaling infrastructure.",
    "MERN Developer - ChefAtHome (2021)",
    "- Led admin & client teams.",
    "- Fixed security vulnerabilities.",
    "- Optimized front-end performance.",
    "Blogger - Codespeedy (2021)",
    "- Wrote 10 blogs on ReactJS fundamentals."
], right_x)

add_section("Achievements", [
    "Star of the Month - ChefAtHome",
    "Hacktoberfest 2020 Contributor",
    "1st - Tech Fest Quiz 2019",
    "1st - Code Debugging 2018",
    "3rd - KIT Hackathon 2019"
], right_x)

pdf_filename = "K_Boopathi_Resume.pdf"
pdf.output(pdf_filename)
