document.addEventListener("DOMContentLoaded", function () {
    // Create a header element
    var header = document.createElement("header");
    
    // Set the HTML content of the header (you can load it from an external file if needed)
    header.innerHTML = `
        <!-- Header Section -->
        <header>
            <!-- Top Left Corner Initials -->
            <h2><a class="initials" href="index.html">MN</a></h2>
            <nav>
                <!-- Nav section for Links (that will be in the top right corner) (give these links cool logos in the future) -->
                <a class="logo-img" href="https://www.linkedin.com/in/max-noddings/" target="_blank">
                    <img class="logo-img" src="/public/linkedin.svg" alt="LinkedIn Logo">
                </a>
                <a class="logo-img git-img" href="https://github.com/MaxNoddings" target="_blank">
                    <img class="logo-img git-img" src="/public/github.png" alt="GitHub Logo">
                </a>
            </nav>
        </header>
    `;
    
    // Insert the header at the beginning of the body
    document.body.insertBefore(header, document.body.firstChild);
});