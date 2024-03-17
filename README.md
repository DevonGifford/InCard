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
<h3 align='center'>
Tech Used in this Project:
</h3>
<p align='center'>
    <img src="https://skillicons.dev/icons?i=ts,nextjs,tailwind" />
    <img src="https://next-auth.js.org/img/logo/logo-sm.png" width=42 alt="Next-Auth">
    <img src="https://img.stackshare.io/service/40157/default_ac6bddce398a038cb30e3dfd23eaab10c84cfc78.jpg" width=44 alt="React-Hot-Toast" >
    <img src="https://skillicons.dev/icons?i=jest" />
</p>

<!-- -------------------------------------------------------------------------- -->

### Introduction:

---

I was tasked with building a web application to manage basic authentication. To meet this requirement, I opted to use Next.js and TypeScript, ensuring support for both server-side and client-side rendering and strong typing.

Authentication and session management were implemented using NextAuth library, utilizing JWT tokens with a maximum age of 5 minutes, users can renew their tokens with a single click; however, if the time elapses, they will be automatically signed out.

Notably, the application's UI exactly matches that of [IdeaCard](https://www.incard.co/), the company that provided the tech task.

> [!NOTE]
>
> - Please disregard boilerplate ShadCN code in `components/ui`, as it does not require review.
> - For known issues and potential enhancements, please refer to this repos [github issues](https://github.com/DevonGifford/ClearScore/issues).
> - Your constructive criticism and suggestions for improvements are welcome!

##### Username & Password:

```shell
incard
```

<br/>

<!-- -------------------------------------------------------------------------- -->

<!-- DEMO IMAGE  -->
<!-- //TODO: 🎯 UPDATE ME -->
<div align=center>
    <img src="/public/github/homepage-demo.png" alt="Demo-Home" title="DemoImage-home" width="400" height="300"> 
    <img src="/public/github/loginpage-demo.png" alt="Demo-Login" title="DemoImage-login" width="400" height="300"> 
</div>

<br>

<!-- -------------------------------------------------------------------------- -->

### 🔑 Assessment Requirements:

---

##### REQUIRED FEATURES:

✔ Fully responsive website.

✔ Includes at least two pages: login and home.

✔ Ensures functionality (e.g., successful login redirects users to the home page).

✔ Handles errors effectively (e.g., incorrect details entered or session expiry).

👨‍💻 Includes a suite of demo unit and integration tests.

</br>

##### STRETCH FEATURES:

✔ Supports both Server-Side Rendering (SSR) and Client-Side Rendering (CSR)

✔ Implements modern form validation, with Zod and React Hook Forms 

✔ Maintains persistent session <em>(login status retained on page reload)</em>

✔ Automatically redirects to the login page upon session expiry

👨‍💻 Includes a suite of demo end to end tests.

</br>

##### BONUS FEATURES:

✔ Landing/Splash page

✔ Mimics InCard authentication and home page styles

✔ Provides protected & unprotected server/client-side pages

✔ Includes toast notifications for user-friendly feedback

✔ Successfully deployed the app with Vercel

<br/>


<!-- -------------------------------------------------------------------------- -->

### 🧪 Test Coverage:

---

> [!WARNING]
>
> ShadCN components, including those in components/ui are thoroughly tested within the library itself. Consequently, there's no need for individual testing of these components in this project.
>
> _The below image reflects the testing status as of the latest commit._

<div align=center>
    <img src="//TODO: 🎯" alt="Demo" title="DemoImage" width="530" height="360">     
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br><br>
