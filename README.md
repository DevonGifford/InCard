<a name="readme-top"></a>

<div align="center">
  <h2>Take-Home Assessment</h2>
  <h4>Frontend NextJs app handeling authentication<h4>
  <h3> 
    <a href='https://incard-technical-assaignment-devon-gifford.vercel.app/', target='_blank'>
      <h5>live demo ↗</h5>
    </a>
  </h3>
  <p align="center">
    <a href="https://github.com/DevonGifford/InCard/issues">Report Bug</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/DevonGifford/InCard/issues">Request Feature</a>
    </p>
</div>

<!-- -------------------------------------------------------------------------- -->
<!-- DEMO IMAGE  -->
<div align=center>
<a href='https://incard-technical-assaignment-devon-gifford.vercel.app/' align=center>
    <img src="/public/github/desktop_landing_page.png" alt="Demo-Home" title="DemoImage-home" width="400" height="300"> 
    <img src="/public/github/desktop_authentication_page.png" alt="Demo-Auth-Page" title="DemoImage-auth-page" width="400" height="300"> 
</a>
</div>

<br>

<!-- -------------------------------------------------------------------------- -->

### Introduction:

---

I was tasked with building a web application to manage basic authentication. To meet this requirement, I opted to use Next.js and TypeScript, ensuring support for both server-side and client-side rendering and strong typing.

Authentication and session management were implemented using NextAuth library, utilizing JWT tokens with a maximum age of 3 minutes, users can renew their tokens with a single click; however, if the time elapses, they will prompted to reauthenticate.

Notably, the application's UI matches that of [InCard](https://www.incard.co/).

> [!NOTE]
>
> **For Authentication you can use the following for both username and password:**
>
> ```shell
>  incard
> ```

<br/>

<!-- -------------------------------------------------------------------------- -->

### 🔑 Assessment Requirements:

---

##### REQUIRED FEATURES:

- ✔ Includes at least two pages: login and home.

- ✔ Ensures functionality (e.g., successful login redirects users to the home page).

- ✔ Implements modern form validation.

- ✔ Handles errors effectively (e.g., incorrect details entered or session expiry).

- ✔ Fully responsive website.

- ✔ Deployed version of the solution.

</br>

##### STRETCH FEATURES:

- ✔ Supports both Server-Side Rendering (SSR) and Client-Side Rendering (CSR).

- ✔ Maintains persistent session (login status retained on page reload).

- ✔ Provides both protected & unprotected pages.

- ✔ Automatically redirects to the login page upon session expiry.

- ✔ Includes a suite of demo unit and integration tests.

</br>

##### BONUS FEATURES:

- ✔ Mimics InCard authentication and home page styles.

- ✔ Includes toast notifications for user-friendly feedback.

- 👨‍💻 Includes a suite of demo end-to-end tests.

<br/>

<!-- -------------------------------------------------------------------------- -->
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br><br>
