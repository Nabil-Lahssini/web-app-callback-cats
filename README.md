# Goal
*describe how this web app will (evantually) earn money or make the world a better place*  

School restaurant web application for students to view the menu and be able to order and pay in advance. The school will be able to see all orders and can create/view/edit/remove promotions, staff members and menus.

The app allows for students to not have to queue for their meals. The school restaurant also has more information about how many meals to make in order to reduce food waste and this also allows for cost savings.

# Acceptance criteria
*how do we know that the goals have been reached?*  

As a student I can…
* … see the menu of today
* … see the allergies, price and availability of a product/meal
* … create a sandwich with available products
* … pay my order in advance
* … log in
* … log out
* … change my password
* … update my 2-factor authentication
* … see my previous orders

As a student I receive an email when my order is ready

As a school restaurant employee I can…
* … see which orders have been placed
* … check out an order when it is ready
* … create/view/edit/remove menus
* … create/view/edit/remove products
* … create/view/edit/remove promotions
* … check the stock

The stock changes when products are ordered and payed.
School restaurant employee is one general account for every employee working in the restaurant. This way, there doesn't have to be a new account for every new employee.
Users such as students will be be able to login via the EhB login system.

Allergies, price and amount of the product are filled in by the school restaurant employee.
Promotions are rewarded to certain products/meals and are chosen by the restaurant and are visible on the menu.


# Threat model
*describe your threat model. One or more architectural diagram expected. Also a list of the principal threats and what you will do about them*  
  
<img src="img/threat_model.png" alt="drawing" width="700"/>
  
| Name | Threat | Solution |
| :---: | :---: | :---: |
| Broken Access Control | Acces control enforces policy such that users cannot act outside of their intended permissions. | Properly implement authentication and access restrictions (deny by default) |
| Cryptographic Failures | Protection needs of data in transit and at rest. | Data encryption. |
| Injection | Hostile data is injected to access unauthorized data. | Using HTML standard validation (eg. email validation). Stripping special characters from user input and writing parameterized queries. Validating input in the backend with trusted and recommended libraries. |
| Insecure Design | Insecure design is a broad category representing different weaknesses, expressed as “missing or ineffective control design.” | More use of threat modeling, secure design patterns and principles, and reference architectures.|
| Security misconfiguration | Improper configured permissions. | Remove unnecessary permissions & features. |
| Vulnerable and Outdated Components | Use of outdated dependencies. | Recurring software dependency updates to detect vulnerable bits of software and removing unused dependencies. Use of Node.js standard libraries that are stable according to the official documentation |
Identification and Authentication Failures | Confirmation of the user's identity, authentication, and session management is critical to protect against authentication-related attacks. | Multi-Factor authentication (2FA), implement DAST and SCA scans to detect and remove issues with implementations errors before code is deployed. reCAPTCHA to prevent use of bots. Maximum amount of logins (3). |
| Software and Data Integrity Failures | Software and data integrity failures relate to code and infrastructure that does not protect against integrity violations. | Ensure that used software is trusted and uses sane security practices. | 
| Security Logging and Monitoring Failures | Help detect, escalate, and respond to active breaches. Without logging and monitoring, breaches cannot be detected. | Log all kinds of failures (login, access control, input validation, …). |
| Server Side Request Forgery | SSRF flaws occur whenever a web application is fetching a remote resource without validating the user-supplied URL. It allows an attacker to coerce the application to send a crafted request to an unexpected destination, even when protected by a firewall, VPN, or another type of network access control list (ACL). | Sanitize and validate inputs, whitelist domains in DNS that the application accesses. |  
  

# Deployment
*minimally, this section contains a public URL of the app. A description of how your software is deployed is a bonus. Do you do this manually, or did you manage to automate? Have you taken into account the security of your deployment process?*
# *you may want further sections*
*especially if the use of your application is not self-evident*
