
        // Auto-update preview as user types
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('resumeForm');
            form.addEventListener('input', updatePreview);
            form.addEventListener('change', updatePreview);
            updatePreview(); // Initial preview update
        });

        function updatePreview() {
            // Personal Information
            const fullName = document.getElementById('fullName').value || 'Your Name';
            const email = document.getElementById('email').value || 'email@example.com';
            const phone = document.getElementById('phone').value || '(555) 123-4567';
            const location = document.getElementById('location').value;
            const linkedin = document.getElementById('linkedin').value;
            const website = document.getElementById('website').value;

            document.getElementById('previewName').textContent = fullName;
            
            let contactLine = `${email} | ${phone}`;
            if (location) contactLine += ` | ${location}`;
            document.getElementById('previewContact').innerHTML = contactLine;

            let linksLine = '';
            if (linkedin) linksLine += linkedin;
            if (website) {
                if (linksLine) linksLine += ' | ';
                linksLine += website;
            }
            
            const linksElement = document.getElementById('previewLinks');
            if (linksLine) {
                linksElement.innerHTML = linksLine;
                linksElement.style.display = 'block';
            } else {
                linksElement.style.display = 'none';
            }

            // Professional Summary
            const summary = document.getElementById('summary').value;
            const summarySection = document.getElementById('previewSummary');
            if (summary) {
                document.getElementById('summaryText').textContent = summary;
                summarySection.style.display = 'block';
            } else {
                summarySection.style.display = 'none';
            }

            // Work Experience
            updateWorkExperience();
            
            // Education
            updateEducation();
            
            // Skills
            updateSkills();
            
            // Projects
            updateProjects();
            
            // Certifications
            updateCertifications();
        }

        function updateWorkExperience() {
            const jobTitles = document.querySelectorAll('input[name="jobTitle[]"]');
            const companies = document.querySelectorAll('input[name="company[]"]');
            const jobLocations = document.querySelectorAll('input[name="jobLocation[]"]');
            const startDates = document.querySelectorAll('input[name="startDate[]"]');
            const endDates = document.querySelectorAll('input[name="endDate[]"]');
            const responsibilities = document.querySelectorAll('textarea[name="responsibilities[]"]');
            
            const workList = document.getElementById('workList');
            const workSection = document.getElementById('previewWork');
            
            let hasWork = false;
            let workHTML = '';
            
            for (let i = 0; i < jobTitles.length; i++) {
                if (jobTitles[i].value.trim() && companies[i].value.trim()) {
                    hasWork = true;
                    const startDate = startDates[i].value ? new Date(startDates[i].value + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '';
                    const endDate = endDates[i].value ? new Date(endDates[i].value + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Present';
                    const dateRange = startDate ? `${startDate} - ${endDate}` : '';
                    
                    workHTML += `
                        <div class="job-entry">
                            <div class="job-header">
                                <div>
                                    <div class="job-title">${jobTitles[i].value}</div>
                                    <div>${companies[i].value}${jobLocations[i].value ? ', ' + jobLocations[i].value : ''}</div>
                                </div>
                                <div class="job-date">${dateRange}</div>
                            </div>`;
                    
                    if (responsibilities[i].value.trim()) {
                        const respList = responsibilities[i].value.split('\n').filter(item => item.trim());
                        if (respList.length > 0) {
                            workHTML += '<ul>';
                            respList.forEach(resp => {
                                const cleanResp = resp.replace(/^[•\-\*]\s*/, '').trim();
                                if (cleanResp) workHTML += `<li>${cleanResp}</li>`;
                            });
                            workHTML += '</ul>';
                        }
                    }
                    workHTML += '</div>';
                }
            }
            
            if (hasWork) {
                workList.innerHTML = workHTML;
                workSection.style.display = 'block';
            } else {
                workSection.style.display = 'none';
            }
        }

        function updateEducation() {
            const degrees = document.querySelectorAll('input[name="degree[]"]');
            const institutions = document.querySelectorAll('input[name="institution[]"]');
            const eduLocations = document.querySelectorAll('input[name="eduLocation[]"]');
            const gradYears = document.querySelectorAll('input[name="gradYear[]"]');
            const gpas = document.querySelectorAll('input[name="gpa[]"]');
            
            const eduList = document.getElementById('eduList');
            const eduSection = document.getElementById('previewEdu');
            
            let hasEdu = false;
            let eduHTML = '';
            
            for (let i = 0; i < degrees.length; i++) {
                if (degrees[i].value.trim() && institutions[i].value.trim()) {
                    hasEdu = true;
                    eduHTML += `
                        <div class="education-entry">
                            <div class="job-header">
                                <div>
                                    <div class="job-title">${degrees[i].value}</div>
                                    <div>${institutions[i].value}${eduLocations[i].value ? ', ' + eduLocations[i].value : ''}</div>
                                </div>
                                <div class="job-date">
                                    ${gradYears[i].value || ''}
                                    ${gpas[i].value ? ' | GPA: ' + gpas[i].value : ''}
                                </div>
                            </div>
                        </div>`;
                }
            }
            
            if (hasEdu) {
                eduList.innerHTML = eduHTML;
                eduSection.style.display = 'block';
            } else {
                eduSection.style.display = 'none';
            }
        }

        function updateSkills() {
            const techSkills = document.getElementById('technicalSkills').value;
            const softSkills = document.getElementById('softSkills').value;
            
            const skillsList = document.getElementById('skillsList');
            const skillsSection = document.getElementById('previewSkills');
            
            let skillsHTML = '';
            
            if (techSkills.trim()) {
                skillsHTML += `<p><strong>Technical:</strong> ${techSkills}</p>`;
            }
            
            if (softSkills.trim()) {
                skillsHTML += `<p><strong>Soft Skills:</strong> ${softSkills}</p>`;
            }
            
            if (skillsHTML) {
                skillsList.innerHTML = skillsHTML;
                skillsSection.style.display = 'block';
            } else {
                skillsSection.style.display = 'none';
            }
        }

        function updateProjects() {
            const projectNames = document.querySelectorAll('input[name="projectName[]"]');
            const projectTechs = document.querySelectorAll('input[name="projectTech[]"]');
            const projectDescs = document.querySelectorAll('textarea[name="projectDesc[]"]');
            const projectUrls = document.querySelectorAll('input[name="projectUrl[]"]');
            
            const projectsList = document.getElementById('projectsList');
            const projectsSection = document.getElementById('previewProjects');
            
            let hasProjects = false;
            let projectsHTML = '';
            
            for (let i = 0; i < projectNames.length; i++) {
                if (projectNames[i].value.trim()) {
                    hasProjects = true;
                    projectsHTML += `
                        <div class="project-entry">
                            <h3>${projectNames[i].value}${projectTechs[i].value ? ' | ' + projectTechs[i].value : ''}</h3>
                            ${projectDescs[i].value ? '<p>' + projectDescs[i].value + '</p>' : ''}
                            ${projectUrls[i].value ? '<p>URL: ' + projectUrls[i].value + '</p>' : ''}
                        </div>`;
                }
            }
            
            if (hasProjects) {
                projectsList.innerHTML = projectsHTML;
                projectsSection.style.display = 'block';
            } else {
                projectsSection.style.display = 'none';
            }
        }

        function updateCertifications() {
            const certifications = document.getElementById('certifications').value;
            const certsList = document.getElementById('certsList');
            const certsSection = document.getElementById('previewCerts');
            
            if (certifications.trim()) {
                const certList = certifications.split('\n').filter(cert => cert.trim());
                let certsHTML = '<ul>';
                certList.forEach(cert => {
                    if (cert.trim()) certsHTML += `<li>${cert.trim()}</li>`;
                });
                certsHTML += '</ul>';
                
                certsList.innerHTML = certsHTML;
                certsSection.style.display = 'block';
            } else {
                certsSection.style.display = 'none';
            }
        }

        function addWorkExperience() {
            const workSection = document.getElementById('workExperience');
            const newWork = document.createElement('div');
            newWork.className = 'dynamic-section';
            newWork.innerHTML = `
                <div class="form-group">
                    <label>Job Title *</label>
                    <input type="text" name="jobTitle[]" required>
                </div>
                <div class="form-group">
                    <label>Company Name *</label>
                    <input type="text" name="company[]" required>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" name="jobLocation[]">
                </div>
                <div class="form-group">
                    <label>Start Date *</label>
                    <input type="month" name="startDate[]" required>
                </div>
                <div class="form-group">
                    <label>End Date (Leave blank if current)</label>
                    <input type="month" name="endDate[]">
                </div>
                <div class="form-group">
                    <label>Job Responsibilities (one per line)</label>
                    <textarea name="responsibilities[]" placeholder="• Managed team of 5 developers&#10;• Increased system efficiency by 30%&#10;• Led implementation of new processes"></textarea>
                </div>
                <button type="button" class="btn btn-danger" onclick="removeSection(this)">Remove Experience</button>
            `;
            workSection.appendChild(newWork);
            
            // Add event listeners for new inputs
            newWork.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('input', updatePreview);
                input.addEventListener('change', updatePreview);
            });
        }

        function addEducation() {
            const eduSection = document.getElementById('education');
            const newEdu = document.createElement('div');
            newEdu.className = 'dynamic-section';
            newEdu.innerHTML = `
                <div class="form-group">
                    <label>Degree *</label>
                    <input type="text" name="degree[]" placeholder="Bachelor of Science in Computer Science" required>
                </div>
                <div class="form-group">
                    <label>Institution *</label>
                    <input type="text" name="institution[]" required>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" name="eduLocation[]">
                </div>
                <div class="form-group">
                    <label>Graduation Year</label>
                    <input type="number" name="gradYear[]" min="1950" max="2030">
                </div>
                <div class="form-group">
                    <label>GPA (optional)</label>
                    <input type="text" name="gpa[]" placeholder="3.8/4.0">
                </div>
                <button type="button" class="btn btn-danger" onclick="removeSection(this)">Remove Education</button>
            `;
            eduSection.appendChild(newEdu);
            
            newEdu.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', updatePreview);
                input.addEventListener('change', updatePreview);
            });
        }

        function addProject() {
            const projectsSection = document.getElementById('projects');
            const newProject = document.createElement('div');
            newProject.className = 'dynamic-section';
            newProject.innerHTML = `
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" name="projectName[]">
                </div>
                <div class="form-group">
                    <label>Technologies Used</label>
                    <input type="text" name="projectTech[]" placeholder="React, Node.js, MongoDB">
                </div>
                <div class="form-group">
                    <label>Project Description</label>
                    <textarea name="projectDesc[]" placeholder="Brief description of the project and your role"></textarea>
                </div>
                <div class="form-group">
                    <label>Project URL (optional)</label>
                    <input type="url" name="projectUrl[]">
                </div>
                <button type="button" class="btn btn-danger" onclick="removeSection(this)">Remove Project</button>
            `;
            projectsSection.appendChild(newProject);
            
            newProject.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('input', updatePreview);
                input.addEventListener('change', updatePreview);
            });
        }

        function removeSection(button) {
            button.parentElement.remove();
            updatePreview();
        }

        function downloadPDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Get form data
            const fullName = document.getElementById('fullName').value || 'Your Name';
            const email = document.getElementById('email').value || 'email@example.com';
            const phone = document.getElementById('phone').value || '(555) 123-4567';
            const location = document.getElementById('location').value;
            const linkedin = document.getElementById('linkedin').value;
            const website = document.getElementById('website').value;
            const summary = document.getElementById('summary').value;
            
            // PDF Settings
            let yPosition = 20;
            const pageWidth = 210;
            const margin = 20;
            const lineHeight = 6;
            const sectionSpacing = 8;
            
            // Helper function to add text with word wrapping
            function addWrappedText(text, x, y, maxWidth, fontSize = 10) {
                doc.setFontSize(fontSize);
                const lines = doc.splitTextToSize(text, maxWidth);
                doc.text(lines, x, y);
                return y + (lines.length * lineHeight);
            }
            
            // Helper function to add section header
            function addSectionHeader(title, y) {
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text(title.toUpperCase(), margin, y);
                doc.line(margin, y + 2, pageWidth - margin, y + 2);
                return y + sectionSpacing;
            }
            
            // Header - Name
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(fullName, pageWidth / 2, yPosition, { align: 'center' });
            yPosition += 8;
            
            // Contact Information
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            let contactLine = `${email} | ${phone}`;
            if (location) contactLine += ` | ${location}`;
            doc.text(contactLine, pageWidth / 2, yPosition, { align: 'center' });
            yPosition += 6;
            
            // Links
            if (linkedin || website) {
                let linksLine = '';
                if (linkedin) linksLine += linkedin;
                if (website) {
                    if (linksLine) linksLine += ' | ';
                    linksLine += website;
                }
                doc.text(linksLine, pageWidth / 2, yPosition, { align: 'center' });
                yPosition += 6;
            }
            
            yPosition += 4;
            
            // Professional Summary
            if (summary.trim()) {
                yPosition = addSectionHeader('Professional Summary', yPosition);
                doc.setFont('helvetica', 'normal');
                yPosition = addWrappedText(summary, margin, yPosition, pageWidth - 2 * margin);
                yPosition += sectionSpacing;
            }
            
            // Work Experience
            const jobTitles = document.querySelectorAll('input[name="jobTitle[]"]');
            const companies = document.querySelectorAll('input[name="company[]"]');
            const jobLocations = document.querySelectorAll('input[name="jobLocation[]"]');
            const startDates = document.querySelectorAll('input[name="startDate[]"]');
            const endDates = document.querySelectorAll('input[name="endDate[]"]');
            const responsibilities = document.querySelectorAll('textarea[name="responsibilities[]"]');
            
            let hasWork = false;
            for (let i = 0; i < jobTitles.length; i++) {
                if (jobTitles[i].value.trim() && companies[i].value.trim()) {
                    if (!hasWork) {
                        yPosition = addSectionHeader('Professional Experience', yPosition);
                        hasWork = true;
                    }
                    
                    // Check if we need a new page
                    if (yPosition > 250) {
                        doc.addPage();
                        yPosition = 20;
                    }
                    
                    // Job title and dates
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(11);
                    doc.text(jobTitles[i].value, margin, yPosition);
                    
                    const startDate = startDates[i].value ? new Date(startDates[i].value + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
                    const endDate = endDates[i].value ? new Date(endDates[i].value + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present';
                    const dateRange = startDate ? `${startDate} - ${endDate}` : '';
                    
                    if (dateRange) {
                        doc.text(dateRange, pageWidth - margin, yPosition, { align: 'right' });
                    }
                    yPosition += lineHeight;
                    
                    // Company and location
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(10);
                    const companyText = companies[i].value + (jobLocations[i].value ? ', ' + jobLocations[i].value : '');
                    doc.text(companyText, margin, yPosition);
                    yPosition += lineHeight;
                    
                    // Responsibilities
                    if (responsibilities[i].value.trim()) {
                        const respList = responsibilities[i].value.split('\n').filter(item => item.trim());
                        respList.forEach(resp => {
                            const cleanResp = resp.replace(/^[•\-\*]\s*/, '').trim();
                            if (cleanResp) {
                                doc.text('• ' + cleanResp, margin + 5, yPosition);
                                yPosition = addWrappedText('• ' + cleanResp, margin + 5, yPosition, pageWidth - 2 * margin - 10);
                            }
                        });
                    }
                    yPosition += 4;
                }
            }
            
            if (hasWork) yPosition += sectionSpacing;
            
            // Education
            const degrees = document.querySelectorAll('input[name="degree[]"]');
            const institutions = document.querySelectorAll('input[name="institution[]"]');
            const eduLocations = document.querySelectorAll('input[name="eduLocation[]"]');
            const gradYears = document.querySelectorAll('input[name="gradYear[]"]');
            const gpas = document.querySelectorAll('input[name="gpa[]"]');
            
            let hasEdu = false;
            for (let i = 0; i < degrees.length; i++) {
                if (degrees[i].value.trim() && institutions[i].value.trim()) {
                    if (!hasEdu) {
                        if (yPosition > 250) {
                            doc.addPage();
                            yPosition = 20;
                        }
                        yPosition = addSectionHeader('Education', yPosition);
                        hasEdu = true;
                    }
                    
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(11);
                    doc.text(degrees[i].value, margin, yPosition);
                    
                    let eduDate = gradYears[i].value || '';
                    if (gpas[i].value) {
                        eduDate += (eduDate ? ' | ' : '') + 'GPA: ' + gpas[i].value;
                    }
                    
                    if (eduDate) {
                        doc.text(eduDate, pageWidth - margin, yPosition, { align: 'right' });
                    }
                    yPosition += lineHeight;
                    
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(10);
                    const institutionText = institutions[i].value + (eduLocations[i].value ? ', ' + eduLocations[i].value : '');
                    doc.text(institutionText, margin, yPosition);
                    yPosition += lineHeight + 3;
                }
            }
            
            if (hasEdu) yPosition += sectionSpacing;
            
            // Skills
            const techSkills = document.getElementById('technicalSkills').value;
            const softSkills = document.getElementById('softSkills').value;
            
            if (techSkills.trim() || softSkills.trim()) {
                if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 20;
                }
                yPosition = addSectionHeader('Skills', yPosition);
                
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);
                
                if (techSkills.trim()) {
                    doc.setFont('helvetica', 'bold');
                    doc.text('Technical: ', margin, yPosition);
                    doc.setFont('helvetica', 'normal');
                    yPosition = addWrappedText(techSkills, margin + 25, yPosition, pageWidth - 2 * margin - 25);
                }
                
                if (softSkills.trim()) {
                    doc.setFont('helvetica', 'bold');
                    doc.text('Soft Skills: ', margin, yPosition);
                    doc.setFont('helvetica', 'normal');
                    yPosition = addWrappedText(softSkills, margin + 25, yPosition, pageWidth - 2 * margin - 25);
                }
                
                yPosition += sectionSpacing;
            }
            
            // Projects
            const projectNames = document.querySelectorAll('input[name="projectName[]"]');
            const projectTechs = document.querySelectorAll('input[name="projectTech[]"]');
            const projectDescs = document.querySelectorAll('textarea[name="projectDesc[]"]');
            const projectUrls = document.querySelectorAll('input[name="projectUrl[]"]');
            
            let hasProjects = false;
            for (let i = 0; i < projectNames.length; i++) {
                if (projectNames[i].value.trim()) {
                    if (!hasProjects) {
                        if (yPosition > 250) {
                            doc.addPage();
                            yPosition = 20;
                        }
                        yPosition = addSectionHeader('Projects', yPosition);
                        hasProjects = true;
                    }
                    
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(11);
                    let projectTitle = projectNames[i].value;
                    if (projectTechs[i].value) {
                        projectTitle += ' | ' + projectTechs[i].value;
                    }
                    doc.text(projectTitle, margin, yPosition);
                    yPosition += lineHeight;
                    
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(10);
                    
                    if (projectDescs[i].value.trim()) {
                        yPosition = addWrappedText(projectDescs[i].value, margin, yPosition, pageWidth - 2 * margin);
                    }
                    
                    if (projectUrls[i].value.trim()) {
                        doc.text('URL: ' + projectUrls[i].value, margin, yPosition);
                        yPosition += lineHeight;
                    }
                    
                    yPosition += 3;
                }
            }
            
            if (hasProjects) yPosition += sectionSpacing;
            
            // Certifications
            const certifications = document.getElementById('certifications').value;
            if (certifications.trim()) {
                if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 20;
                }
                yPosition = addSectionHeader('Certifications', yPosition);
                
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);
                
                const certList = certifications.split('\n').filter(cert => cert.trim());
                certList.forEach(cert => {
                    if (cert.trim()) {
                        doc.text('• ' + cert.trim(), margin, yPosition);
                        yPosition += lineHeight;
                    }
                });
            }
            
            // Save the PDF
            const fileName = fullName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_resume.pdf';
            doc.save(fileName);
        }