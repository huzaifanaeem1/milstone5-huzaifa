document.getElementById('resumeform')?.addEventListener("submit", function (event) {
    event.preventDefault();
    //get refference to form elements using threir Ids
    const profilePictureInput = document.getElementById('profilePicture');
    const fullNameElement = document.getElementById('fullName');
    const emailElement = document.getElementById('email');
    const ageElement = document.getElementById('age');
    const addressElement = document.getElementById('address');
    const phoneNumberElement = document.getElementById('phoneNumber');
    const educationElement = document.getElementById('education');
    const experienceElement = document.getElementById('experience');
    const skillsElement = document.getElementById('skills');
    //check if all form element are present
    if (profilePictureInput &&
        fullNameElement &&
        emailElement && ageElement
        && addressElement &&
        phoneNumberElement &&
        educationElement &&
        experienceElement &&
        skillsElement) {
        const fullName = fullNameElement.value;
        const email = emailElement.value;
        const age = ageElement.value;
        const address = addressElement.value;
        const phoneNumber = phoneNumberElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        //profile picture elements
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
        //resume object
        const resumeHTML = `
<h2>Resume</h2>
${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
<p><strong>FullName:${fullName}</p>
<p><strong>Email:${email}</p>
<p><strong>Age:</strong>${age}</p>
<p><strong>Address:${address}</p>
<p><strong>Phone Number:</strong>${phoneNumber}</p>

<h3>Education:</h3>
<p>${education}</p>

<h3>Experience:</h3>
<p>${experience}</p>

<h3>Skills:</h3>
<p>${skills}</p>
`;
        // resume output
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeHTML;
            resumeOutputElement.classList.remove('hidden');
            //create conatainer for buttons
            const buttonContainer = document.createElement('div');
            buttonContainer.id = 'buttonContainer';
            resumeOutputElement.appendChild(buttonContainer);
            // add download pdf button
            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download as PDF';
            downloadButton.addEventListener('click', () => {
                window.print();
            });
            buttonContainer.appendChild(downloadButton);
            // add shareable link button
            const shareableLinkButton = document.createElement('button');
            shareableLinkButton.textContent = 'Copy Shareable Link';
            shareableLinkButton.addEventListener('click', async () => {
                try {
                    //create a unique shareable link
                    const shareableLink = `https://yourdomain.com/resume/${fullName.replace(/\s+/g, '_')}_cv.html`;
                    //use clipboard API to copy the shareable link
                    await navigator.clipboard.writeText(shareableLink);
                    alert('shareable link to copied to clipboard');
                }
                catch (err) {
                    console.error('failed to copy link:', err);
                    alert('failed to copy link to clipboard please try again.');
                }
            });
            buttonContainer.appendChild(shareableLinkButton);
        }
        else {
            console.error('Resume output container no found');
        }
    }
    else {
        console.log('form element are not found');
    }
});

