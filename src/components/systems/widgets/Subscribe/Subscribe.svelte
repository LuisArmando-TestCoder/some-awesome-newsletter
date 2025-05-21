

Haz una página en some-awesome-newsletter/src/components/systems/widgets/Subscribe/Subscribe.svelte que tome info en los query paramos, pero que también tome un end point param al que le envíe toda la info, para que los dueños de negocio puedan usarla

Record the requests that it is sending

Tienen que haber New Sources privados y públicos y los privados son los que pueden ser listados a la hora de escogerlos en el widget y de parte del usuario porque de parte de un un gestor de New Sources ellos pueden poner un widget para una específica pero si no ponen en New Source entonces los usuarios podrían escoger los Shorts pero no queremos que aparezcan los ciertos sucesos privados entonces Privados serían como los que está usando esta chica Bella

only the email?

to which newsSource?

Autofill remaining data with the query params

Este es el endpoint del back
ai-newsletter-translated/API/newsletter/subscribeEndpoint.ts

Estos son los tipos del backend
ai-newsletter-translated/types.ts

Estos son los tipos del front
some-awesome-newsletter/src/components/types.ts

Este es el store del front
some-awesome-newsletter/src/components/store.ts

In here there is submitPublicSubscription
some-awesome-newsletter/src/components/systems/steps/StepsTowardsSubscribe/stages/C_Language.svelte

U have to use this request
some-awesome-newsletter/src/components/systems/requests/submitPublicSubscription.ts

Look at all the steps this has and look at each component these components use some-awesome-newsletter/src/components/systems/steps/StepsTowardsSubscribe/MainSteps.svelte

the query params this uses have to be taken (nosotros podemos o no tener el query param de newssource)
some-awesome-newsletter/src/components/systems/steps/StepsTowardsSubscribe/stages/A_Welcome.svelte

Para la configuración de los news sources privados y publicos (sólo los publicos son visibles en el widget) esta configuracion debe estar en avanzado aquí, por defecto públicos
some-awesome-newsletter/src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/NewsSource/UpdateNewsSourceForm.svelte 

esta página se va a usar como widget y como página de suscripción, por lo que tiene que tener un botón de subscribe y subir todos los datos al endpoint