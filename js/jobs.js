document.addEventListener('DOMContentLoaded', () => {
    // Sample data - in a real app, this would come from an API
    const userData = {
        industry: 'Software Engineering',
        skills: ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML']
    };

    const jobs = [
        {
            id: 1,
            title: 'Senior Frontend Developer',
            company: 'Microsoft',
            logo: 'https://logo.clearbit.com/microsoft.com',
            location: 'San Francisco, CA (Remote)',
            type: 'Full-time',
            salary: '$120,000 - $150,000',
            match: 92,
            skills: ['JavaScript', 'React', 'TypeScript', 'CSS', 'HTML'],
            description: 'We are seeking an experienced Frontend Developer to join our dynamic team. You will be responsible for developing user interfaces and implementing frontend functionality.',
            postedDate: '2d ago',
            isSaved: false,
            isFeatured: true
        },
        {
            id: 2,
            title: 'Backend Engineer',
            company: 'Google',
            logo: 'https://logo.clearbit.com/google.com',
            location: 'New York, NY',
            type: 'Full-time',
            salary: '$110,000 - $140,000',
            match: 86,
            skills: ['Node.js', 'Express', 'MongoDB', 'AWS', 'API Design'],
            description: 'Join our backend team to build scalable infrastructure and APIs that power our data-intensive applications.',
            postedDate: '4d ago',
            isSaved: true,
            isFeatured: false
        },
        {
            id: 3,
            title: 'Full Stack Developer',
            company: 'Meta',
            logo: 'https://logo.clearbit.com/meta.com',
            location: 'Austin, TX (Hybrid)',
            type: 'Full-time',
            salary: '$100,000 - $130,000',
            match: 78,
            skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
            description: 'We need a versatile developer who can work across our entire stack, from frontend UI to backend services.',
            postedDate: '1w ago',
            isSaved: false,
            isFeatured: false
        },
        {
            id: 4,
            title: 'DevOps Engineer',
            company: 'Amazon',
            logo: 'https://logo.clearbit.com/amazon.com',
            location: 'Remote',
            type: 'Full-time',
            salary: '$130,000 - $160,000',
            match: 70,
            skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
            description: 'Help us build and maintain our cloud infrastructure and deployment pipelines for our SaaS products.',
            postedDate: '1w ago',
            isSaved: false,
            isFeatured: false
        },
        {
            id: 5,
            title: 'Mobile Developer (iOS)',
            company: 'Apple',
            logo: 'https://logo.clearbit.com/apple.com',
            location: 'Seattle, WA',
            type: 'Full-time',
            salary: '$115,000 - $145,000',
            match: 65,
            skills: ['Swift', 'iOS', 'UIKit', 'Core Data', 'REST API'],
            description: 'Join our mobile team to develop innovative iOS applications used by millions of users worldwide.',
            postedDate: '2w ago',
            isSaved: false,
            isFeatured: false
        }
    ];
    
    const recommendedJobs = [
        {
            id: 6,
            title: 'Frontend Developer',
            company: 'Spotify',
            logo: 'https://logo.clearbit.com/spotify.com',
            match: 89
        },
        {
            id: 7,
            title: 'React Native Developer',
            company: 'Netflix',
            logo: 'https://logo.clearbit.com/netflix.com',
            match: 85
        },
        {
            id: 8,
            title: 'UX/UI Designer',
            company: 'Adobe',
            logo: 'https://logo.clearbit.com/adobe.com',
            match: 78
        }
    ];

    const industries = [
        { id: 'software-engineering', name: 'Software Engineering', icon: 'code' },
        { id: 'data-science', name: 'Data Science', icon: 'chart-bar' },
        { id: 'marketing', name: 'Marketing', icon: 'bullhorn' },
        { id: 'finance', name: 'Finance', icon: 'dollar-sign' },
        { id: 'healthcare', name: 'Healthcare', icon: 'heartbeat' },
        { id: 'education', name: 'Education', icon: 'graduation-cap' },
        { id: 'design', name: 'Design', icon: 'palette' }
    ];

    // Initialize the page
    function initJobsPage() {
        renderIndustryHeading();
        renderIndustryFilters();
        renderJobListings();
        renderSavedJobs();
        renderRecommendedJobs();
        addEventListeners();
    }

    // Render industry heading
    function renderIndustryHeading() {
        const headingContainer = document.querySelector('.industry-heading') || document.createElement('div');
        
        if (!headingContainer.classList.contains('industry-heading')) {
            headingContainer.classList.add('industry-heading');
            document.querySelector('.content-area').prepend(headingContainer);
        }
        
        headingContainer.innerHTML = `
            <div class="industry-icon">
                <i class="fas fa-code"></i>
            </div>
            <div class="industry-text">
                <h2>${userData.industry} Jobs</h2>
                <p>Discover opportunities matching your skills and experience</p>
            </div>
        `;
    }

    // Render industry filter tabs
    function renderIndustryFilters() {
        const filterContainer = document.querySelector('.industry-filter-container') || document.createElement('div');
        
        if (!filterContainer.classList.contains('industry-filter-container')) {
            filterContainer.classList.add('industry-filter-container');
            document.querySelector('.jobs-search-section').prepend(filterContainer);
        }
        
        filterContainer.innerHTML = industries.map(industry => `
            <div class="industry-filter-card ${industry.id === 'software-engineering' ? 'active' : ''}" data-industry="${industry.id}">
                <div class="industry-filter-icon">
                    <i class="fas fa-${industry.icon}"></i>
                </div>
                <div class="industry-filter-name">${industry.name}</div>
            </div>
        `).join('');
    }

    // Render job listings
    function renderJobListings() {
        const jobListingsContainer = document.querySelector('.job-listings') || document.createElement('div');
        
        if (!jobListingsContainer.classList.contains('job-listings')) {
            jobListingsContainer.classList.add('job-listings');
            document.querySelector('.main-content').append(jobListingsContainer);
        }
        
        if (jobs.length === 0) {
            jobListingsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3 class="empty-state-title">No jobs found</h3>
                    <p class="empty-state-text">Try adjusting your search filters or explore other industries</p>
                    <button class="empty-state-button">View All Jobs</button>
                </div>
            `;
            return;
        }
        
        jobListingsContainer.innerHTML = jobs.map(job => `
            <div class="job-card ${job.isFeatured ? 'featured-job' : ''}" data-job-id="${job.id}">
                ${job.isFeatured ? '<div class="featured-badge"><i class="fas fa-star"></i> Featured</div>' : ''}
                <div class="job-card-header">
                    <div class="company-logo">
                        <img src="${job.logo}" alt="${job.company} logo">
                    </div>
                    <div class="job-info">
                        <h3 class="job-title">${job.title}</h3>
                        <div class="company-name">${job.company}</div>
                        <div class="job-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                            <span><i class="fas fa-briefcase"></i> ${job.type}</span>
                            <span><i class="fas fa-money-bill-alt"></i> ${job.salary}</span>
                        </div>
                    </div>
                    <div class="job-match">
                        <div class="match-percent ${getMatchClass(job.match)}">${job.match}%</div>
                        <div class="match-text">Match</div>
                    </div>
                </div>
                <div class="job-description">
                    ${job.description}
                </div>
                <div class="job-skills">
                    ${job.skills.map(skill => `<div class="skill-tag">${skill}</div>`).join('')}
                </div>
                <div class="job-card-footer">
                    <div class="posted-date">${job.postedDate}</div>
                    <div class="job-actions">
                        <button class="save-job-btn ${job.isSaved ? 'saved' : ''}" data-job-id="${job.id}">
                            <i class="far fa-heart"></i> ${job.isSaved ? 'Saved' : 'Save'}
                        </button>
                        <button class="apply-job-btn" data-job-id="${job.id}">Apply Now</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render saved jobs
    function renderSavedJobs() {
        const savedJobsContainer = document.querySelector('.saved-jobs-list') || document.createElement('div');
        
        if (!savedJobsContainer.classList.contains('saved-jobs-list')) {
            savedJobsContainer.classList.add('saved-jobs-list');
            const sidebarContainer = document.querySelector('.sidebar-section') || document.createElement('div');
            
            if (!sidebarContainer.classList.contains('sidebar-section')) {
                sidebarContainer.classList.add('sidebar-section');
                sidebarContainer.innerHTML = '<h3 class="sidebar-title">Saved Jobs</h3>';
                document.querySelector('.right-sidebar').append(sidebarContainer);
            }
            
            sidebarContainer.append(savedJobsContainer);
        }
        
        const savedJobs = jobs.filter(job => job.isSaved);
        
        if (savedJobs.length === 0) {
            savedJobsContainer.innerHTML = `
                <div class="empty-saved-jobs">
                    <p>No saved jobs yet</p>
                    <small>Save jobs to view them later</small>
                </div>
            `;
            return;
        }
        
        savedJobsContainer.innerHTML = savedJobs.map(job => `
            <div class="saved-job-item" data-job-id="${job.id}">
                <div class="saved-job-logo">
                    <img src="${job.logo}" alt="${job.company} logo">
                </div>
                <div class="saved-job-info">
                    <div class="saved-job-title">${job.title}</div>
                    <div class="saved-job-company">${job.company}</div>
                </div>
            </div>
        `).join('');
    }

    // Render recommended jobs
    function renderRecommendedJobs() {
        const recommendedContainer = document.querySelector('.recommended-jobs-section') || document.createElement('div');
        
        if (!recommendedContainer.classList.contains('recommended-jobs-section')) {
            recommendedContainer.classList.add('recommended-jobs-section');
            recommendedContainer.innerHTML = '<h3 class="sidebar-title">Recommended for You</h3>';
            document.querySelector('.right-sidebar').append(recommendedContainer);
        }
        
        const recommendedList = document.createElement('div');
        recommendedList.classList.add('recommended-jobs-list');
        
        recommendedList.innerHTML = recommendedJobs.map(job => `
            <div class="recommended-job-item" data-job-id="${job.id}">
                <div class="recommended-job-header">
                    <div class="recommended-job-logo">
                        <img src="${job.logo}" alt="${job.company} logo">
                    </div>
                    <div class="recommended-job-info">
                        <div class="recommended-job-title">${job.title}</div>
                        <div class="recommended-job-company">${job.company}</div>
                    </div>
                </div>
                <div class="recommended-job-match">
                    <i class="fas fa-chart-line"></i> ${job.match}% Match
                </div>
            </div>
        `).join('');
        
        // Clear previous content and append new list
        const existingList = recommendedContainer.querySelector('.recommended-jobs-list');
        if (existingList) {
            existingList.remove();
        }
        recommendedContainer.appendChild(recommendedList);
    }

    // Get match class based on percentage
    function getMatchClass(percentage) {
        if (percentage >= 80) return 'percent-high';
        if (percentage >= 60) return 'percent-medium';
        return 'percent-low';
    }

    // Add event listeners
    function addEventListeners() {
        // Save job button click
        document.addEventListener('click', function(e) {
            if (e.target.closest('.save-job-btn')) {
                const button = e.target.closest('.save-job-btn');
                const jobId = parseInt(button.dataset.jobId);
                toggleSaveJob(jobId, button);
            }
            
            // Job card click - show job details
            if (e.target.closest('.job-card') && 
                !e.target.closest('.save-job-btn') && 
                !e.target.closest('.apply-job-btn')) {
                const jobCard = e.target.closest('.job-card');
                const jobId = parseInt(jobCard.dataset.jobId);
                showJobDetails(jobId);
            }
            
            // Industry filter click
            if (e.target.closest('.industry-filter-card')) {
                const industryCard = e.target.closest('.industry-filter-card');
                const industry = industryCard.dataset.industry;
                filterByIndustry(industry);
            }
            
            // Saved job item click
            if (e.target.closest('.saved-job-item')) {
                const savedJobItem = e.target.closest('.saved-job-item');
                const jobId = parseInt(savedJobItem.dataset.jobId);
                showJobDetails(jobId);
            }
            
            // Recommended job item click
            if (e.target.closest('.recommended-job-item')) {
                const recommendedJobItem = e.target.closest('.recommended-job-item');
                const jobId = parseInt(recommendedJobItem.dataset.jobId);
                showJobDetails(jobId);
            }
        });
        
        // Search input
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.trim().toLowerCase();
                filterJobs(searchTerm);
            });
        }
    }

    // Toggle save job
    function toggleSaveJob(jobId, button) {
        const job = jobs.find(j => j.id === jobId);
        if (job) {
            job.isSaved = !job.isSaved;
            
            if (job.isSaved) {
                button.innerHTML = '<i class="fas fa-heart"></i> Saved';
                button.classList.add('saved');
            } else {
                button.innerHTML = '<i class="far fa-heart"></i> Save';
                button.classList.remove('saved');
            }
            
            // Re-render saved jobs
            renderSavedJobs();
        }
    }

    // Show job details
    function showJobDetails(jobId) {
        const job = [...jobs, ...recommendedJobs].find(j => j.id === jobId);
        
        if (!job) return;
        
        // Create modal content
        const modalContent = `
            <div class="job-detail-modal">
                <div class="job-detail-header">
                    <div class="job-detail-logo">
                        <img src="${job.logo}" alt="${job.company} logo">
                    </div>
                    <div class="job-detail-info">
                        <h2 class="job-detail-title">${job.title}</h2>
                        <div class="job-detail-company">${job.company}</div>
                        <div class="job-detail-meta">
                            ${job.location ? `<span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>` : ''}
                            ${job.type ? `<span><i class="fas fa-briefcase"></i> ${job.type}</span>` : ''}
                            ${job.salary ? `<span><i class="fas fa-money-bill-alt"></i> ${job.salary}</span>` : ''}
                            <span><i class="fas fa-chart-line"></i> ${job.match}% Match</span>
                        </div>
                    </div>
                </div>
                <div class="job-detail-body">
                    <div class="job-detail-section">
                        <h3>Job Description</h3>
                        <p>${job.description || 'No description available'}</p>
                    </div>
                    ${job.skills ? `
                    <div class="job-detail-section">
                        <h3>Required Skills</h3>
                        <div class="job-skills">
                            ${job.skills.map(skill => `<div class="skill-tag">${skill}</div>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                    <div class="job-detail-section">
                        <h3>About Company</h3>
                        <p>Information about ${job.company} would appear here.</p>
                    </div>
                </div>
                <div class="job-detail-footer">
                    <button class="save-job-btn ${job.isSaved ? 'saved' : ''}" data-job-id="${job.id}">
                        <i class="${job.isSaved ? 'fas' : 'far'} fa-heart"></i> ${job.isSaved ? 'Saved' : 'Save'}
                    </button>
                    <button class="apply-job-btn" data-job-id="${job.id}">Apply Now</button>
                </div>
            </div>
        `;
        
        // Show modal (assuming a modal system exists)
        // In a real implementation, you would use a modal library or implement your own
        console.log('Showing job details for:', job.title);
        
        // For demonstration, we'll just alert
        alert(`Viewing details for: ${job.title} at ${job.company}`);
    }

    // Filter jobs by industry
    function filterByIndustry(industry) {
        // Update active industry button
        const industryButtons = document.querySelectorAll('.industry-filter-card');
        industryButtons.forEach(button => {
            if (button.dataset.industry === industry) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // In a real app, fetch jobs for the selected industry
        console.log('Filtering jobs by industry:', industry);
        
        // For demonstration, we'll just update the heading
        const industryName = industries.find(i => i.id === industry)?.name || 'Jobs';
        const industryIcon = industries.find(i => i.id === industry)?.icon || 'briefcase';
        
        const headingContainer = document.querySelector('.industry-heading');
        headingContainer.innerHTML = `
            <div class="industry-icon">
                <i class="fas fa-${industryIcon}"></i>
            </div>
            <div class="industry-text">
                <h2>${industryName} Jobs</h2>
                <p>Discover opportunities matching your skills and experience</p>
            </div>
        `;
    }

    // Filter jobs by search term
    function filterJobs(searchTerm) {
        if (!searchTerm) {
            renderJobListings();
            return;
        }
        
        const filteredJobs = jobs.filter(job => {
            return (
                job.title.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm) ||
                job.description.toLowerCase().includes(searchTerm) ||
                job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
            );
        });
        
        const jobListingsContainer = document.querySelector('.job-listings');
        
        if (filteredJobs.length === 0) {
            jobListingsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3 class="empty-state-title">No matching jobs found</h3>
                    <p class="empty-state-text">Try adjusting your search terms or filters</p>
                    <button class="empty-state-button">Clear Filters</button>
                </div>
            `;
            return;
        }
        
        jobListingsContainer.innerHTML = filteredJobs.map(job => `
            <div class="job-card ${job.isFeatured ? 'featured-job' : ''}" data-job-id="${job.id}">
                ${job.isFeatured ? '<div class="featured-badge"><i class="fas fa-star"></i> Featured</div>' : ''}
                <div class="job-card-header">
                    <div class="company-logo">
                        <img src="${job.logo}" alt="${job.company} logo">
                    </div>
                    <div class="job-info">
                        <h3 class="job-title">${job.title}</h3>
                        <div class="company-name">${job.company}</div>
                        <div class="job-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                            <span><i class="fas fa-briefcase"></i> ${job.type}</span>
                            <span><i class="fas fa-money-bill-alt"></i> ${job.salary}</span>
                        </div>
                    </div>
                    <div class="job-match">
                        <div class="match-percent ${getMatchClass(job.match)}">${job.match}%</div>
                        <div class="match-text">Match</div>
                    </div>
                </div>
                <div class="job-description">
                    ${job.description}
                </div>
                <div class="job-skills">
                    ${job.skills.map(skill => `<div class="skill-tag">${skill}</div>`).join('')}
                </div>
                <div class="job-card-footer">
                    <div class="posted-date">${job.postedDate}</div>
                    <div class="job-actions">
                        <button class="save-job-btn ${job.isSaved ? 'saved' : ''}" data-job-id="${job.id}">
                            <i class="${job.isSaved ? 'fas' : 'far'} fa-heart"></i> ${job.isSaved ? 'Saved' : 'Save'}
                        </button>
                        <button class="apply-job-btn" data-job-id="${job.id}">Apply Now</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Initialize the page when DOM is loaded
    initJobsPage();
});

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the skills chart
  const skillsChartElement = document.getElementById('skillsChart');
  
  if (skillsChartElement) {
    // Ensure Chart.js is loaded before attempting to create chart
    if (typeof Chart !== 'undefined') {
      const skillsChart = new Chart(skillsChartElement, {
        type: 'bar',
        data: {
          labels: ['JavaScript', 'React', 'Python', 'Node.js', 'AWS'],
          datasets: [{
            label: 'Demand (% of job listings)',
            data: [85, 78, 65, 62, 58],
            backgroundColor: [
              'rgba(79, 110, 247, 0.7)',
              'rgba(79, 110, 247, 0.7)',
              'rgba(79, 110, 247, 0.7)',
              'rgba(79, 110, 247, 0.7)',
              'rgba(79, 110, 247, 0.7)'
            ],
            borderColor: [
              'rgba(79, 110, 247, 1)',
              'rgba(79, 110, 247, 1)',
              'rgba(79, 110, 247, 1)',
              'rgba(79, 110, 247, 1)',
              'rgba(79, 110, 247, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              max: 100,
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    } else {
      console.error('Chart.js is not loaded. Skills chart cannot be created.');
    }
  }
  
  // Job search functionality
  const jobSearchInput = document.getElementById('jobSearchInput');
  if (jobSearchInput) {
    jobSearchInput.addEventListener('input', function() {
      // Add search functionality here
      console.log('Searching for:', jobSearchInput.value);
    });
  }
  
  // Filter functionality
  const filters = ['jobType', 'experienceLevel', 'location'];
  filters.forEach(filterId => {
    const filterElement = document.getElementById(filterId);
    if (filterElement) {
      filterElement.addEventListener('change', function() {
        console.log(`${filterId} filter changed to:`, this.value);
        // Implement filter functionality here
      });
    }
  });
  
  // Save job button functionality
  const saveButtons = document.querySelectorAll('.save-job-btn');
  saveButtons.forEach(button => {
    button.addEventListener('click', function() {
      const jobCard = this.closest('.job-card');
      const jobTitle = jobCard.querySelector('.job-title').textContent;
      
      // Toggle saved state
      const icon = this.querySelector('i');
      if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        this.classList.add('saved');
        console.log(`Job saved: ${jobTitle}`);
      } else {
        icon.classList.replace('fas', 'far');
        this.classList.remove('saved');
        console.log(`Job unsaved: ${jobTitle}`);
      }
    });
  });
  
  // Apply job button functionality
  const applyButtons = document.querySelectorAll('.apply-job-btn');
  applyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const jobCard = this.closest('.job-card');
      const jobTitle = jobCard.querySelector('.job-title').textContent;
      const companyName = jobCard.querySelector('.company-name').textContent;
      
      console.log(`Applying for ${jobTitle} at ${companyName}`);
      // Implement apply functionality here
      
      // You could redirect to an application page or show a modal
      alert(`Application started for ${jobTitle} at ${companyName}`);
    });
  });

  // Fix saved jobs rendering
  const savedJobItems = document.querySelectorAll('.saved-job-item');
  savedJobItems.forEach(item => {
    // Make sure the HTML structure matches our CSS expectations
    const jobInfo = item.querySelector('.saved-job-info');
    if (jobInfo) {
      const title = jobInfo.querySelector('h4');
      const company = jobInfo.querySelector('p');
      
      // If the HTML structure doesn't match our CSS, fix it
      if (!title && jobInfo.firstElementChild) {
        const titleText = jobInfo.firstElementChild.textContent;
        const companyText = jobInfo.lastElementChild ? jobInfo.lastElementChild.textContent : '';
        
        jobInfo.innerHTML = `
          <h4>${titleText}</h4>
          <p>${companyText}</p>
        `;
      }
    }
  });

  // Make saved job items clickable
  savedJobItems.forEach(item => {
    item.addEventListener('click', function(e) {
      if (!e.target.closest('.quick-apply-btn')) {
        // Show job details or navigate to job page
        console.log('View job details for saved job');
        // In a real app, this would show a modal or navigate
      }
    });
  });

  // Quick apply buttons
  const quickApplyButtons = document.querySelectorAll('.quick-apply-btn');
  quickApplyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent triggering the parent click
      const jobItem = this.closest('.saved-job-item');
      const jobTitle = jobItem.querySelector('h4')?.textContent || 'this job';
      console.log(`Quick applying to ${jobTitle}`);
      // In a real app, this would open an application form
      alert(`Application started for ${jobTitle}`);
    });
  });

  // View all saved jobs button
  const viewAllSavedBtn = document.querySelector('.view-all-saved-btn');
  if (viewAllSavedBtn) {
    viewAllSavedBtn.addEventListener('click', function() {
      console.log('View all saved jobs');
      // In a real app, this would navigate to a saved jobs page
    });
  }

  // Next tip button
  const nextTipBtn = document.querySelector('.next-tip-btn');
  if (nextTipBtn) {
    nextTipBtn.addEventListener('click', function() {
      const tipText = document.querySelector('.tip-text');
      if (tipText) {
        // Cycle through tips (just an example)
        const tips = [
          "When evaluating job offers, remember to consider the total compensation package including benefits, not just the base salary.",
          "Set aside 3-6 months of living expenses as an emergency fund while job searching.",
          "Research salary ranges for positions in your field before interviews to negotiate effectively.",
          "Consider the commute costs when evaluating onsite positions versus remote work opportunities."
        ];
        
        const currentTip = tipText.textContent.trim();
        const currentIndex = tips.findIndex(tip => tip === currentTip);
        const nextIndex = (currentIndex + 1) % tips.length;
        
        tipText.textContent = tips[nextIndex];
      }
    });
  }
});

// Update the saved jobs section to use real company logos
function updateSavedJobsHTML() {
    const savedJobsSection = document.querySelector('.saved-jobs-list');
    if (savedJobsSection) {
        // Get all saved job items
        const savedJobItems = savedJobsSection.querySelectorAll('.saved-job-item');
        
        // For each saved job item
        savedJobItems.forEach(item => {
            const logoContainer = item.querySelector('.saved-job-logo');
            const infoContainer = item.querySelector('.saved-job-info');
            
            if (logoContainer && infoContainer) {
                // Get company name
                const companyText = infoContainer.querySelector('p')?.textContent || 
                                  infoContainer.querySelector('.saved-job-company')?.textContent;
                
                if (companyText) {
                    // Get job title
                    const titleText = infoContainer.querySelector('h4')?.textContent || 
                                    infoContainer.querySelector('.saved-job-title')?.textContent;
                    
                    // Update HTML structure if needed
                    logoContainer.innerHTML = `<img src="https://logo.clearbit.com/${companyText.toLowerCase().replace(/\s+/g, '')}.com" alt="${companyText} Logo">`;
                    
                    // Make sure the info container has the correct HTML structure
                    infoContainer.innerHTML = `
                        <h4>${titleText || 'Job Title'}</h4>
                        <p>${companyText}</p>
                    `;
                }
            }
        });
    }
}

// Call this function after rendering saved jobs
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    
    // Update the images in the job search sections
    updateSavedJobsHTML();
    
    // ...existing code...
});