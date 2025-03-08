1. Mongodb aggregation Pipelines --> https://www.youtube.com/watch?v=SUZKhBvxW5c&list=PLRAV69dS1uWQ6CZCehxKy0rjkqhQ2Z88t&index=2#


2. CI/CD Pipeline Using GitHub Action| Auto Deploy Nodejs API on AWS EC2 step by step in Hindi --> https://www.youtube.com/watch?v=3jXtTSnA8zw&t=1641s

3. Domain maping with Route-53  https://youtu.be/ovDeSP2fYlw?feature=shared

# Map GoDaddy Domain to AWS EC2 Without Route 53

Follow these steps to map your **GoDaddy domain** with an **AWS EC2 instance** **without using Route 53**.

## Step 1: Get Your EC2 Public IP
1. Log in to your **AWS account**.
2. Navigate to **EC2 Dashboard**.
3. Find your instance and note down the **Public IPv4 Address**.

   - Example: `3.15.32.100`

## Step 2: Assign an Elastic IP (Recommended)
If your instance's public IP changes on restart, assign an **Elastic IP**:
1. Go to **EC2 Dashboard > Elastic IPs**.
2. Allocate a **New Elastic IP**.
3. Associate the **Elastic IP** with your EC2 instance.
4. Use this **Elastic IP** in the next steps.

## Step 3: Update GoDaddy DNS Settings
1. Log in to **GoDaddy**.
2. Go to **My Products > Domains**.
3. Click on **Manage DNS** for your domain.
4. In the **DNS Records** section:
   - **A Record**: Update or add a new record:
     - **Host**: `@`
     - **Points to**: Your EC2 Public IP (or Elastic IP)
     - **TTL**: `600` (or default)
   - **CNAME Record (for www subdomain)**:
     - **Host**: `www`
     - **Points to**: Your root domain (e.g., `example.com`)
     - **TTL**: `600`

## Step 4: Allow Traffic to EC2
1. Go to **EC2 > Security Groups**.
2. Edit the security group attached to your EC2 instance.
3. Add inbound rules:
   - **HTTP (80)**: `0.0.0.0/0`
   - **HTTPS (443)** (if using SSL): `0.0.0.0/0`

## Done 🎉
Your GoDaddy domain should now be mapped to your AWS EC2 instance!

4. SSL Certificate with Let’s Encrypt (Certbot)
https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04


