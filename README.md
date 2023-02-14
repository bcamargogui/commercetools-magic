# commercetools Magic
Utilize OpenAI's APIs to dynamically create Product Descriptions in commercetools Composable Commerce.

https://user-images.githubusercontent.com/79161219/218758219-12ed0eb9-0ca3-4ee9-a846-2fcad39ce93e.mov


## Requirements
- commercetools Composable Commerce Project
  - API Client with manage_products scope (for app)
  - API Client with manage_project scope (for Terraform)
- node 18
- gcloud tools
- Terraform
- Google Cloud Account & Project

## commercetools Setup
Running the Terraform setup will create the following in commercetools Composable Commerce:
  [!product-type](assets/OpenAI-Product-Type.png)

## GCP setup
- https://cloud.google.com/functions/docs/tutorials/terraform-pubsub

## Deploy Google Cloud Function
gcloud functions deploy magic-description \
--gen2 \
--region=us-central1 \
--runtime=nodejs18 \
--entry-point=cloudEvent \
--trigger-topic=product-state-transition
--env-vars-file .env.yaml
