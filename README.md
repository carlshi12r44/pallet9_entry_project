## Pallet 9 E-commerce subscription shop website

### basic structure

`pallet9_virtual_store` \* this is the frontend application

`pallet9_virtual_store_backend` \* this is the backend application

### requirements before start

`Node` version `v14.17.0`

#### a. Setting up Strapi Backend

Since currently this project is developed in local environment, the product information is erased after the backend is shut down. Will consider upload the product information on the cloud in the future

1. In `pallet9_virtual_store_backend`, run `yarn develop`, then go to `localhost:1337/admin` to register your admine

2. Go to `Products` collection type tab. Insert one image from the `image` folder (where images are stored in `pallet9_virtual_store_backend/images`), `Content`, `Meta_description`, `Meta_title`, `Price`, `Slug`, `Name`; Once finished, click `Save` and `Publish` to publish the product on the backend and then it will be used in the Frontend
   Here's a dummy information for anyone to grab into these field

```
Image: ./pallet9_virtual_store_backend/images/pineapple.jpeg
Content: The pineapple product -- tasteful
Meta_description: The pineapple product is tasteful and good
Meta_title: The pineapple product
Price: 5.99
Slug: the-pineapple-product
Name: the-pineapple-product

```

3. Then Go to `Settings` tab and under `Roles` in `USERS & PERMISSIONS PLUGIN`, click the edit button next to `Public`. In the `Public` role, check both `findone` and `find` under `APPLICATION` in the `Permissions` tab. Click `Save` to save the role.

`Stripe` for checkout page, `Strapi`, and `Next.js`

#### b. Setting up Next.js Frontend

This project need to create a file called `.env.local` in the root directory of `pallet9_virtual_store`
I used Mailtrap to send and receive some dummy emails to test whether it's working.
the structure of the `.env.local` file is shown below

```
NEXT_PUBLIC_STRIPE_PUBLIC_KEY = 'your Stripe public key'

STRIPE_SECRET_KEY = 'your Stripe secret key'

PLAN_ID = 'your subscription product plan id in Stripe'

SMTP_MAILTRAP_USER = 'your username for Mailtrap app (this is for email notification after checkout)'

SMTP_MAILTRAP_PASS = 'your password for Mailtrap app (this is for email notification after checkout)'
```

Next, direct to the root directory in `pallet9_virtual_store` and run `npm install` to install all the required packages for this project

### steps to run the project

1. Go to `pallet9_virtual_store_backend` and run `yarn develop`

2. Then Go to `pallet9_virtual_store` and run `npm run dev`

3. Go to `localhost:3000` to open up the front end application

4. Go to shop page, and do the payment, finally you will receive an email on which product you have purchased through the subscription in Mailtrap.

### Released under MIT License

Copyright (c) 2013 Mark Otto.

Copyright (c) 2017 Andrew Fong.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
