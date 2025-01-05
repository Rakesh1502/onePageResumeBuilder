window.onload = function () {
    document.getElementById("download-btn").addEventListener("click", async () => {
        const { jsPDF } = window.jspdf; // Import jsPDF from the loaded library

        // Select the resume content
        const resumeElement = document.getElementById("resume");

        // Apply A4 dimensions
        const a4Width = 595.28; // A4 width in points
        const a4Height = 841.89; // A4 height in points

        // Render the content into a canvas using html2canvas
        html2canvas(resumeElement, {
            scale: 2, // High resolution for clarity
            useCORS: true // Enable cross-origin resource sharing
        }).then(canvas => {
            const contentWidth = canvas.width;
            const contentHeight = canvas.height;

            // Calculate scaling to fit content in A4 dimensions
            const widthScale = a4Width / contentWidth;
            const heightScale = a4Height / contentHeight;
            const scaleFactor = Math.min(widthScale, heightScale);

            // Create a jsPDF instance
            const pdf = new jsPDF('portrait', 'pt', [a4Width, a4Height]);
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const scaledWidth = contentWidth * scaleFactor;
            const scaledHeight = contentHeight * scaleFactor;

            // Adjust <li> styling to ensure bullets are indented
            const listItems = resumeElement.querySelectorAll("li");
            listItems.forEach(li => {
                li.style.marginLeft = "20px"; // Moves bullets to the right
                li.style.textIndent = "-20px"; // Keeps bullets aligned
                li.style.listStylePosition = "inside"; // Align bullets with text
            });

            // Add scaled content to the PDF
            pdf.addImage(imgData, 'JPEG', 0, 0, scaledWidth, scaledHeight);

            // Save the PDF
            pdf.save('resume.pdf');
        });
    });
};
