from django.shortcuts import render
from .models import Products, Order
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
    product_objects = Products.objects.all()

    item_name = request.GET.get('item_name')
        
    if item_name:
        product_objects = product_objects.filter(title__icontains=item_name)

    paginator = Paginator(product_objects, 4)
    page = request.GET.get('page')
    product_objects = paginator.get_page(page)

    return render(request, 'shop/index.html', {'product_objects': product_objects})

def details(request, id):
    product = Products.objects.get(id=id)
    context = {
    'product': product
    }
    return render(request, 'shop/details.html', context)

@csrf_exempt
def checkout(request):

    if request.method == 'POST':
        items= request.POST.get('items', "")
        name = request.POST.get('name',"")
        email = request.POST.get('email',"")
        address = request.POST.get('address',"")
        city = request.POST.get('city',"")
        state = request.POST.get('state',"")
        zipcode = request.POST.get('zipcode',"")
        total = request.POST.get('total',"")
    
        order = Order(items=items, name=name, email=email, address=address, city=city, state=state, zipcode=zipcode, total=total)
        order.save()
    return render(request, 'shop/checkout.html')