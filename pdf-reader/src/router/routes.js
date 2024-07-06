import FileUpload from 'components/FileUpload.vue';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'upload', component: FileUpload } // Rota para o componente de upload
    ]
  },
  // Rota para página de erro 404 - Deixe sempre como a última rota
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
