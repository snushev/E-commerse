# Django E-commerce Project

This project is a web-based application built with Django, simulating a basic e-commerce system. It includes product management, a shopping cart, user forms, pagination, and an admin panel.

## ⚙️ Technologies

- Python 3.13
- Django 5.x
- SQLite (by default)
- Bootstrap (for basic front-end styling)

## 📦 Main Features & Modules

### 🛒 Shopping Cart

- Add products to the cart
- Update quantity
- Total price calculation
- Cart is session-based, no user login required
- Remove products from the cart

### 📄 Pagination

- All product listing views use Django's built-in `Paginator`
- Customizable number of items per page
- Bootstrap-styled pagination controls

### 🧱 Models

- **Product** – represents items for sale with fields like name, description, price, image, and stock
- **Category** – organizes products into categories

### 🧾 Forms

- **ProductForm** – for admin product creation/editing
- **CartAddProductForm** – allows adding items with selected quantity to the cart
- **CheckoutForm** – collects user info during checkout

### 🖥️ Admin Panel

- Full CRUD access to products and categories
- Filters, search, and sorting options
- Custom `ModelAdmin` classes for better control

### 📄 Pages

- Home page with a list of products
- Product detail page
- Shopping cart page

## 🛠️ Setup

```bash
git clone https://github.com/yourusername/yourproject.git
cd yourproject
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## 🔐 Access

- Admin access at /admin/ with a user created via createsuperuser
- Shopping cart works anonymously via sessions
