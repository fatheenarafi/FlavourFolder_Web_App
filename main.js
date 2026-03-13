/* =============================================
   FlavourFolder — Main JavaScript
   ============================================= */

// ---- Recipe Data Store ----
const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    category: "Italian",
    description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper. Rich, creamy, and utterly irresistible.",
    image: "images/spaghetti_carbonara.png",
    link: "recipe.html"
  },
  {
    id: 2,
    title: "Greek Salad",
    category: "Salad",
    description: "Fresh and vibrant Greek salad with tomatoes, cucumbers, feta cheese, olives, and a drizzle of olive oil.",
    image: "images/greek_salad.png",
    link: "recipe.html"
  },
  {
    id: 3,
    title: "Chocolate Lava Cake",
    category: "Dessert",
    description: "A decadent chocolate dessert with a molten center that flows like lava. Pure indulgence in every bite.",
    image: "images/chocolate_lava_cake.png",
    link: "recipe.html"
  },
  {
    id: 4,
    title: "Tom Yum Soup",
    category: "Asian",
    description: "A hot and sour Thai soup with aromatic lemongrass, shrimp, mushrooms, and a burst of chili heat.",
    image: "images/tom_yum_soup.png",
    link: "recipe.html"
  },
  {
    id: 5,
    title: "Margherita Pizza",
    category: "Italian",
    description: "A classic Neapolitan pizza with fresh mozzarella, San Marzano tomatoes, and fragrant basil leaves.",
    image: "images/margherita_pizza.png",
    link: "recipe.html"
  },
  {
    id: 6,
    title: "Tiramisu",
    category: "Dessert",
    description: "The iconic Italian dessert with layers of coffee-soaked ladyfingers, mascarpone cream, and cocoa dust.",
    image: "images/tiramisu_dessert.png",
    link: "recipe.html"
  }
];

// =============================================
// 1. LIVE SEARCH — index.html
// =============================================
function initLiveSearch() {
  const heroSearchInput = document.getElementById('hero-search-input');
  const navSearchInput = document.getElementById('nav-search-input');
  const recipeGrid = document.getElementById('recipe-grid');
  const noResults = document.getElementById('no-results');

  if (!recipeGrid) return; // Not on home page

  // Render recipe cards dynamically
  function renderRecipeCards() {
    recipeGrid.innerHTML = '';
    recipes.forEach((recipe, index) => {
      const card = document.createElement('div');
      card.className = `col-sm-6 col-md-4 mb-4 recipe-card-wrapper fade-in fade-in-delay-${(index % 4) + 1}`;
      card.setAttribute('data-title', recipe.title.toLowerCase());
      card.setAttribute('data-category', recipe.category.toLowerCase());
      card.innerHTML = `
        <div class="card recipe-card h-100">
          <div class="card-img-wrapper">
            <span class="badge-category">${recipe.category}</span>
            <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}" loading="lazy">
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${recipe.title}</h5>
            <p class="card-text flex-grow-1">${recipe.description}</p>
            <a href="${recipe.link}" class="btn btn-primary-custom mt-auto">View Recipe →</a>
          </div>
        </div>
      `;
      recipeGrid.appendChild(card);
    });
  }

  renderRecipeCards();

  // Search / filter function
  function filterRecipes(searchTerm) {
    const cards = document.querySelectorAll('.recipe-card-wrapper');
    let visibleCount = 0;
    const term = searchTerm.toLowerCase().trim();

    cards.forEach(card => {
      const title = card.getAttribute('data-title');
      const category = card.getAttribute('data-category');

      if (title.includes(term) || category.includes(term)) {
        card.classList.remove('recipe-card', 'hidden');
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Attach keyup events
  if (heroSearchInput) {
    heroSearchInput.addEventListener('keyup', function () {
      filterRecipes(this.value);
      // Sync with nav search
      if (navSearchInput) navSearchInput.value = this.value;
    });
  }

  if (navSearchInput) {
    navSearchInput.addEventListener('keyup', function () {
      filterRecipes(this.value);
      // Sync with hero search
      if (heroSearchInput) heroSearchInput.value = this.value;
    });
  }
}


// =============================================
// 2. TAB TOGGLE — recipe.html
// =============================================
function initTabToggle() {
  const ingredientsTab = document.getElementById('ingredients-tab');
  const stepsTab = document.getElementById('steps-tab');
  const ingredientsSection = document.getElementById('ingredients-section');
  const stepsSection = document.getElementById('steps-section');

  if (!ingredientsTab || !stepsTab) return; // Not on recipe page

  ingredientsTab.addEventListener('click', function (e) {
    e.preventDefault();
    // Activate tab
    ingredientsTab.classList.add('active');
    stepsTab.classList.remove('active');
    // Show/hide sections
    ingredientsSection.style.display = 'block';
    stepsSection.style.display = 'none';
    // Smooth animation
    ingredientsSection.classList.add('fade-in');
    setTimeout(() => ingredientsSection.classList.remove('fade-in'), 600);
  });

  stepsTab.addEventListener('click', function (e) {
    e.preventDefault();
    // Activate tab
    stepsTab.classList.add('active');
    ingredientsTab.classList.remove('active');
    // Show/hide sections
    stepsSection.style.display = 'block';
    ingredientsSection.style.display = 'none';
    // Smooth animation
    stepsSection.classList.add('fade-in');
    setTimeout(() => stepsSection.classList.remove('fade-in'), 600);
  });
}


// =============================================
// 3. SAVE NOTES — recipe.html
// =============================================
function initSaveNotes() {
  const saveBtn = document.getElementById('save-notes-btn');
  const notesTextarea = document.getElementById('chef-notes-textarea');
  const notesDisplay = document.getElementById('saved-notes-display');

  if (!saveBtn || !notesTextarea) return; // Not on recipe page

  saveBtn.addEventListener('click', function () {
    const noteText = notesTextarea.value.trim();

    if (noteText === '') {
      // Show warning
      notesDisplay.innerHTML = `
        <div class="alert alert-warning d-flex align-items-center fade-in" role="alert">
          <span style="font-size: 1.3rem; margin-right: 10px;">⚠️</span>
          <span>Please write a note first before saving.</span>
        </div>
      `;
      return;
    }

    // Show saved note
    notesDisplay.innerHTML = `
      <div class="saved-note fade-in">
        <div class="alert alert-success d-flex align-items-center mb-2" role="alert" style="border-radius: 8px;">
          <span style="font-size: 1.2rem; margin-right: 8px;">✅</span>
          <strong>Note saved!</strong>
        </div>
        <div style="padding: 12px 16px; background: #f8f9fa; border-radius: 8px; font-style: italic; color: #555;">
          "${noteText}"
        </div>
      </div>
    `;

    // Add a subtle success animation to button
    saveBtn.textContent = '✓ Saved!';
    saveBtn.classList.add('btn-success');
    saveBtn.classList.remove('btn-dark-custom');
    setTimeout(() => {
      saveBtn.textContent = 'Save Notes';
      saveBtn.classList.remove('btn-success');
      saveBtn.classList.add('btn-dark-custom');
    }, 2000);
  });
}


// =============================================
// 4. CATEGORY BUTTON TOGGLE — submit.html
// =============================================
let selectedCategory = '';

function initCategoryToggle() {
  const categoryBtns = document.querySelectorAll('.category-btn');

  if (categoryBtns.length === 0) return; // Not on submit page

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remove active from all
      categoryBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked
      this.classList.add('active');
      // Store selected category
      selectedCategory = this.getAttribute('data-category');
      // Clear error if visible
      const catError = document.getElementById('category-error');
      if (catError) catError.style.display = 'none';
    });
  });
}


// =============================================
// 5. FORM VALIDATION — submit.html
// =============================================
function initFormValidation() {
  const submitBtn = document.getElementById('submit-recipe-btn');
  const form = document.getElementById('recipe-submit-form');

  if (!submitBtn || !form) return; // Not on submit page

  submitBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const titleInput = document.getElementById('recipe-title');
    const emailInput = document.getElementById('recipe-email');
    const ingredientsInput = document.getElementById('recipe-ingredients');
    const catError = document.getElementById('category-error');

    let isValid = true;

    // Clear previous states
    clearValidation(titleInput);
    clearValidation(emailInput);
    clearValidation(ingredientsInput);
    if (catError) catError.style.display = 'none';

    // Validate Title
    if (titleInput.value.trim() === '') {
      showError(titleInput, 'Please enter a recipe title.');
      isValid = false;
    } else {
      showSuccess(titleInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
      showError(emailInput, 'Please enter your email address.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      showSuccess(emailInput);
    }

    // Validate Category
    if (selectedCategory === '') {
      if (catError) {
        catError.style.display = 'block';
        catError.textContent = 'Please select a category.';
      }
      isValid = false;
    }

    // Validate Ingredients & Steps
    if (ingredientsInput.value.trim() === '') {
      showError(ingredientsInput, 'Please list your ingredients and steps.');
      isValid = false;
    } else {
      showSuccess(ingredientsInput);
    }

    // If all valid, show success modal
    if (isValid) {
      const modal = new bootstrap.Modal(document.getElementById('successModal'));
      modal.show();
    }
  });

  // "Submit Another" button in modal
  const submitAnotherBtn = document.getElementById('submit-another-btn');
  if (submitAnotherBtn) {
    submitAnotherBtn.addEventListener('click', function () {
      // Reset form
      form.reset();
      selectedCategory = '';
      // Remove active from category buttons
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      // Clear all validation
      const inputs = form.querySelectorAll('.form-control');
      inputs.forEach(clearValidation);
      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('successModal'));
      if (modal) modal.hide();
    });
  }
}

function showError(input, message) {
  input.classList.add('is-invalid');
  input.classList.remove('is-valid');
  let feedback = input.nextElementSibling;
  // Skip form-text elements
  while (feedback && !feedback.classList.contains('invalid-feedback') && !feedback.classList.contains('valid-feedback')) {
    feedback = feedback.nextElementSibling;
  }
  if (feedback && feedback.classList.contains('invalid-feedback')) {
    feedback.textContent = message;
    feedback.style.display = 'block';
  }
}

function showSuccess(input) {
  input.classList.add('is-valid');
  input.classList.remove('is-invalid');
  let feedback = input.parentElement.querySelector('.valid-feedback');
  if (feedback) {
    feedback.style.display = 'block';
  }
}

function clearValidation(input) {
  input.classList.remove('is-invalid', 'is-valid');
  const parent = input.parentElement;
  const invalidFb = parent.querySelector('.invalid-feedback');
  const validFb = parent.querySelector('.valid-feedback');
  if (invalidFb) invalidFb.style.display = 'none';
  if (validFb) validFb.style.display = 'none';
}


// =============================================
// 6. SCROLL ANIMATIONS (Intersection Observer)
// =============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}


// =============================================
// 7. NAVBAR SCROLL EFFECT
// =============================================
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-sm');
      navbar.style.padding = '6px 0';
    } else {
      navbar.classList.remove('shadow-sm');
      navbar.style.padding = '12px 0';
    }
  });
}


// =============================================
// 8. INGREDIENT CHECKBOX STRIKETHROUGH
// =============================================
function initIngredientCheckboxes() {
  const checkboxes = document.querySelectorAll('.ingredient-checkbox');
  
  checkboxes.forEach(cb => {
    cb.addEventListener('change', function() {
      const row = this.closest('.ingredient-row');
      const name = row.querySelector('.ingredient-name');
      if (this.checked) {
        name.style.textDecoration = 'line-through';
        name.style.color = '#999';
        row.style.opacity = '0.6';
      } else {
        name.style.textDecoration = 'none';
        name.style.color = '';
        row.style.opacity = '1';
      }
    });
  });
}


// =============================================
// INITIALIZE ALL ON DOM READY
// =============================================
document.addEventListener('DOMContentLoaded', function () {
  initLiveSearch();
  initTabToggle();
  initSaveNotes();
  initCategoryToggle();
  initFormValidation();
  initScrollAnimations();
  initNavbarScroll();
  initIngredientCheckboxes();
});
