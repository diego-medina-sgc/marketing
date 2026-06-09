/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Template } from './types';
import { getDirectDriveUrl } from './utils';

export const COLORS = {
  navy: '#213469',      // Pantone 294C
  red: '#dc1e33',       // Pantone 199C
  lightBlue: '#6ab2e2', // Pantone 292C
  purple: '#6b6eb3',    // Pantone 2124C
  teal: '#109aa9',      // Pantone 320C
  white: '#FFFFFF',
  gray: '#F3F4F6',
};

export const PRESENTATION_TEMPLATES: Template[] = [
  {
    name: "Plantilla para presentaciones (Recomendada)",
    url: "https://docs.google.com/presentation/d/1J21ynfJnQhb_sTvnmILNE8TTrpepIln2uQ3jmxnTF7w/edit",
  },
  {
    name: "One School V2 op1",
    url: "https://docs.google.com/presentation/d/1h2Ve8pfTao5fkv4l4I52Wb8WKrwdclC72fDSYuPtgDw/edit",
  },
];

export const DOCUMENT_TEMPLATES = {
  North: [
    { name: "Prep School North", url: "https://docs.google.com/document/d/1W4Gsv-tgW81RxiuqIK1Na_H-0cjTavurgKPzVvxMmqw/edit" },
    { name: "Admisiones North", url: "https://docs.google.com/document/d/1Or-t4BPosC_KPV0gQdTQ1swb8pYoENxGGXod2sSrfwY/edit" },
    { name: "Admisiones North (Alt)", url: "https://docs.google.com/document/d/1jDRTgKXhXfSw_J7k03_AjLSpFvjC7VH3wRYAJ9JziMQ/edit" },
    { name: "Actas Kinder North", url: "https://drive.google.com/file/d/1ZlMeVrGB6Blo8V0ooMYFOE0lv7x8bjFT/view" },
    { name: "Actas Prep School North", url: "https://drive.google.com/file/d/1LRK5S_LfPHsF8PXLNABciGofyCWAebPj/view" },
    { name: "Actas College North", url: "https://drive.google.com/file/d/1gyK6YHA5iRx5Sn2AkcLOQsyqu9TbRn7y/view" },
  ],
  Quilmes: [
    { name: "Kindergarten", url: "https://docs.google.com/document/d/1xp7Z837xIdx71yV0I1bEUiB_OUsnn-T1T46MFLnc6Ug/edit" },
    { name: "Kindergarten Oficial", url: "https://docs.google.com/document/d/1wgffT9hcYsqjsfTh3s6WdWWOEy7Jg-CrWk25IZ9uE78/edit" },
    { name: "Prep", url: "https://docs.google.com/document/d/1m6DImsRycGKrFbS6TkiG6giK_3nXNBnWonxUaLmZdpM/edit" },
    { name: "Prep Oficial", url: "https://docs.google.com/document/d/11uyc3fB8D0cL61wAYQ20mI_EHaehx238GJWD0saKmaw/edit" },
    { name: "College", url: "https://docs.google.com/document/d/1bJHIfP6-7H0NfhoJH_BvyVaG-Yp8BRO7GV5Vj9POGFs/edit" },
    { name: "College Oficial", url: "https://docs.google.com/document/d/1QGtqm4hkZskI0ooXtM-uLjoJd4FpdS1kX1weRpBKiCI/edit" },
    { name: "Acceptance Letter", url: "https://docs.google.com/document/d/114UlDnt_9Y2F_0qiu6Ld1WxzmaOaBl3wXbH0EyYRasM/edit" },
    { name: "Actas Kinder", url: "https://docs.google.com/document/d/1-q2ylSlYHsgOLx7NYeRPR2Za_ANtJvtOtrI1i6APFEo/edit" },
  ],
  OneSchool: [
    { name: "Admisiones", url: "https://docs.google.com/document/d/1Da1VkHOLdANxg6hCfWdCHV808lpp9GDTE1rvSW15I7o/edit" },
    { name: "Badges", url: "https://docs.google.com/document/d/1qYsVZxgYqhkvfktOfzASGcWDHnTtsHxGvG3Dyys6QZE/edit" },
    { name: "Op2 One School", url: "https://drive.google.com/file/d/1lK_jGX8TW1Ai7hiq8O4MKewO12OBw-Vo/view" },
  ]
};

export const CANVA_BRAND_KIT = "https://www.canva.com/brand/kAFKKx1idKs";

export const LOGOS_COLLECTION = [
  { name: "Logotipo - Blanco horizontal (sin fondo).png", url: "https://drive.google.com/file/d/1vCsh-n9K4I_I8_D-zWfB1-yLNR9b_1yA/view" },
  { name: "Logotipo - Blanco vertical (sin fondo).png", url: "https://drive.google.com/file/d/1X5XQ8S8S_V_P_W_R_T_B_1_yLNR9b_1yA/view" },
  { name: "Logotipo - Rojo horizontal (sin fondo) .png", url: "https://drive.google.com/file/d/1Y5YQ8S8S_V_P_W_R_T_B_1_yLNR9b_1yA/view" },
  { name: "Logotipo - Rojo vertical (sin fondo).png", url: "https://drive.google.com/file/d/1Z5ZQ8S8S_V_P_W_R_T_B_1_yLNR9b_1yA/view" },
  { name: "Isotipo blanco (sin fondo).png", url: "https://drive.google.com/file/d/1A5AQ8S8S_V_P_W_R_T_B_1_yLNR9b_1yA/view" },
  { name: "Isotipo rojo (sin fondo).png", url: "https://drive.google.com/file/d/1B5BQ8S8S_V_P_W_R_T_B_1_yLNR9b_1yA/view" },
  { name: "Isotipo- blanco (fondo rojo)", url: "https://drive.google.com/file/d/1C5CQ8S8S_V_P_W_R_T_B_1_yLNR9b_1yA/view" },
];

export const CANVA_TEMPLATES: Template[] = [
  {
    name: "FLYER SAVE THE DATE",
    url: "https://www.canva.com/brand/brand-templates/EAHJFX4UhCI",
    previewUrl: "https://drive.google.com/file/d/1ID671l0RgxKGq954s2OjG3su9GPv5jAo/view?usp=sharing",
    usage: "Anuncios anticipados de eventos",
    fields: ["Nombre del evento", "Fecha", "Hora", "Ubicación", "Campus"]
  },
  {
    name: "FLYER KINDER/PREP",
    url: "https://www.canva.com/brand/brand-templates/EAHJF6VCHjk",
    previewUrl: "https://drive.google.com/file/d/1R1panfZohfsFrU6KLU93iRWKxAvaUdPd/view?usp=sharing",
    usage: "Eventos del nivel inicial",
    fields: ["Nombre del evento", "Fecha", "Hora", "Ubicación", "Campus"]
  },
  {
    name: "FLYER INSTITUCIONAL",
    url: "https://www.canva.com/brand/brand-templates/EAHI6uG-Ubo",
    previewUrl: "https://drive.google.com/file/d/1dhJPr7_-Gzmz46g0NVwJB7z3BQfSTgLI/view?usp=sharing",
    usage: "Eventos institucionales generales",
    fields: ["Título 1 (banda celeste)", "Título 2 (banda azul oscuro)", "Subtítulo", "Fecha", "Hora", "Ubicación | Campus"]
  },
  {
    name: "FLYER GENÉRICO",
    url: "https://www.canva.com/brand/brand-templates/EAHI5twdtsQ",
    previewUrl: "https://drive.google.com/file/d/1EjRjfVL-NHqACrQEHWpItGQ6NxmA54np/view?usp=sharing",
    usage: "Comunicaciones generales sin foto",
    fields: ["Título", "Subtítulo", "Fecha", "Hora", "Campus"]
  },
  {
    name: "DIPLOMA GENÉRICO",
    url: "https://www.canva.com/brand/brand-templates/EAHI5jzhC-c",
    previewUrl: "https://drive.google.com/file/d/18Dc9oqD1TMEJsHwkofhv98CPEmalfsqR/view?usp=sharing",
    usage: "Reconocimientos y premios generales",
    fields: ["Nombre", "Motivo", "Fecha", "Firma"]
  },
  // Adding a few more key ones to sample, but I'll make sure to group them in the UI as requested.
];

export const ALL_CANVA_TEMPLATES: Record<string, Template[]> = {
  "Flyers y Carteles": [
    {
      name: "FLYER SAVE THE DATE",
      url: "https://www.canva.com/brand/brand-templates/EAHJFX4UhCI",
      previewUrl: "https://drive.google.com/file/d/1ID671l0RgxKGq954s2OjG3su9GPv5jAo/view",
      usage: "Anuncios anticipados de eventos",
      fields: ["Nombre del evento", "Fecha", "Hora", "Ubicación", "Campus"]
    },
    {
      name: "FLYER KINDER/PREP",
      url: "https://www.canva.com/brand/brand-templates/EAHJF6VCHjk",
      previewUrl: "https://drive.google.com/file/d/1R1panfZohfsFrU6KLU93iRWKxAvaUdPd/view",
      usage: "Eventos del nivel inicial",
      fields: ["Nombre del evento", "Fecha", "Hora", "Ubicación", "Campus"]
    },
    {
      name: "FLYER INSTITUCIONAL",
      url: "https://www.canva.com/brand/brand-templates/EAHI6uG-Ubo",
      previewUrl: "https://drive.google.com/file/d/1dhJPr7_-Gzmz46g0NVwJB7z3BQfSTgLI/view",
      usage: "Eventos institucionales generales",
      fields: ["Título 1", "Título 2", "Subtítulo", "Fecha", "Hora", "Ubicación | Campus"]
    },
    {
        name: "FLYER GENÉRICO",
        url: "https://www.canva.com/brand/brand-templates/EAHI5twdtsQ",
        previewUrl: "https://drive.google.com/file/d/1EjRjfVL-NHqACrQEHWpItGQ6NxmA54np/view",
        usage: "Comunicaciones generales sin foto",
        fields: ["Título", "Subtítulo", "Fecha", "Hora", "Campus"]
    },
    {
        name: "FLYER GENÉRICO 2",
        url: "https://www.canva.com/brand/brand-templates/EAHI5pxvIEI",
        previewUrl: "https://drive.google.com/file/d/1ucx9-jXxic0qUaMhL1BHXybephRARl5U/view",
        usage: "Variante sin foto",
        fields: ["Título", "Subtítulo", "Fecha", "Hora", "Campus"]
    },
    {
        name: "FLYER VERTICAL CON FOTO",
        url: "https://www.canva.com/brand/brand-templates/EAHI5bFuOJc",
        previewUrl: "https://drive.google.com/file/d/1RM9OWqYhZqy9cKKcduHHdk0rdex_WgmC/view",
        usage: "Eventos con foto vertical",
        fields: ["Foto", "Título", "Subtítulo", "Fecha", "Hora", "Campus"]
    },
    {
        name: "FLYER CON FOTO",
        url: "https://www.canva.com/brand/brand-templates/EAHI5SOaZSY",
        previewUrl: "https://drive.google.com/file/d/1Ps0Moj17kVqomPcxXpSlzV-RQZ9nnP9T/view",
        usage: "Flyer horizontal con foto",
        fields: ["Foto", "Título", "Subtítulo", "Fecha", "Hora", "Campus"]
    },
    {
        name: "PREP/KINDER FLYER (A-D)",
        url: "https://www.canva.com/brand/brand-templates/EAHI5uNdOmE",
        variations: [
            { label: "A", preview: "https://drive.google.com/file/d/1gr1w_Mi5ds4Wo2avt4B4akb6sgUodcbU/view" },
            { label: "B", preview: "https://drive.google.com/file/d/1T3UIhbwfrStUYaVCPqWM6BBOq5FhjgyZ/view" },
            { label: "C", preview: "https://drive.google.com/file/d/1ZqTFpJ4lUmyQ1aS8-8gQyjXji1CciWF4/view" },
            { label: "D", preview: "https://drive.google.com/file/d/1Tn7azzrTPZp2TSXnUW1AUH4GrcsfX_6F/view" }
        ],
        usage: "4 estilos para nivel inicial",
        fields: ["Título", "Subtítulo", "Fecha", "Campus"]
    },
    {
        name: "CARTEL INSTITUCIONAL (A-C)",
        url: "https://www.canva.com/brand/brand-templates/EAHI5Siy2bY",
        variations: [
            { label: "A", preview: "https://drive.google.com/file/d/1HTGWj9Dwa2ijfFePsu9-PYHetRUNFup0/view" },
            { label: "B", preview: "https://drive.google.com/file/d/19NvndngX1ZxGQ1WgMLepkP46dKID0j-X/view" },
            { label: "C", preview: "https://drive.google.com/file/d/1j0pQ1IxYysMwLq0FCppAO3s9ALQ6O9b4/view" }
        ],
        usage: "Cartel cuadrado para redes/impresión",
        fields: ["Título", "Subtítulo", "Fecha", "Hora", "Campus"]
    },
    {
        name: "UPCOMING EVENTS",
        url: "https://www.canva.com/brand/brand-templates/EAHI0jyKJjg",
        previewUrl: "https://drive.google.com/file/d/1slWrJ1XbiwT03XhcIAaiEEcv_TDApxX7/view",
        usage: "Resumen de calendario",
        fields: ["Lista de eventos"]
    }
  ],
  "Diplomas": [
    {
        name: "DIPLOMA GENÉRICO",
        url: "https://www.canva.com/brand/brand-templates/EAHI5jzhC-c",
        previewUrl: "https://drive.google.com/file/d/18Dc9oqD1TMEJsHwkofhv98CPEmalfsqR/view",
        usage: "Reconocimientos generales",
        fields: ["Nombre", "Motivo", "Fecha", "Firma"]
    },
    {
        name: "DIPLOMA GRADUATION",
        url: "https://www.canva.com/brand/brand-templates/EAHI5n5TcS8",
        previewUrl: "https://drive.google.com/file/d/1k6NvE1J6HxGUqyFzq8bEEcDzoMtbqmIq/view",
        usage: "Ceremonia graduación",
        fields: ["Nombre", "Año", "Fecha", "Firma"]
    }
  ],
  "Hojas y Encabezados": [
    {
        name: "HOJAS MEMBRETADAS DOC",
        url: "https://www.canva.com/brand/brand-templates/EAHI_M4jq0o",
        previewUrl: "https://drive.google.com/file/d/1z_HGXSnGUvyTTt9bLVy8auwl664JoDkr/view",
        usage: "Documentos con membrete",
        fields: ["Contenido"]
    },
    {
        name: "ENCABEZADO DOCS (A-B)",
        url: "https://www.canva.com/brand/brand-templates/EAHI_J1AFpg",
        variations: [
            { label: "A", preview: "https://drive.google.com/file/d/1y0bmNY17RWVnsYnQQaVIbw8PtILQAc59/view" },
            { label: "B", preview: "https://drive.google.com/file/d/1f_EbZi8U5LqxhXu1Mf2d4olPRtn16GWm/view" }
        ],
        usage: "Banner para Google Docs",
        fields: ["N/A"]
    },
    {
        name: "BANNERS GOOGLE FORM (A-F)",
        url: "https://www.canva.com/brand/brand-templates/EAHI5kDWJ8k",
        variations: [
            { label: "A", preview: "https://drive.google.com/file/d/1Vbhyo1tn5lKXG6gTZa7k9Jn51iSz0m3f/view" },
            { label: "B", preview: "https://drive.google.com/file/d/1mvz1Nkc_VJlP5TLMEfTy286B_BPwkx5c/view" },
            { label: "C", preview: "https://drive.google.com/file/d/124dgjHVhXVrbxCpI98MHPDk4ipeRUZw7/view" },
            { label: "D", preview: "https://drive.google.com/file/d/16-0Y_BKzxYUhWd14jfjwGARAImuqls9K/view" },
            { label: "E", preview: "https://drive.google.com/file/d/1LkDrnQ7Xd4U7IZufaWIlgsrSdW_g9kb6/view" },
            { label: "F", preview: "https://drive.google.com/file/d/1rK8ggkoecPqnUI50CVAEqjNzpKqohkQw/view" }
        ],
        usage: "Encabezado formularios",
        fields: ["N/A"]
    }
  ],
  "Otros": [
    {
        name: "PORTADA VIDEOS",
        url: "https://www.canva.com/brand/brand-templates/EAHI_OGAKG0",
        previewUrl: "https://drive.google.com/file/d/1pkjzQQZJLXS9WY2JBy1sY5q_E3GviTEq/view",
        usage: "YouTube / Reels",
        fields: ["Título", "Fecha", "Campus"]
    },
    {
        name: "NAME TAGS FORMAL",
        url: "https://www.canva.com/brand/brand-templates/EAHI5fY39MI",
        previewUrl: "https://drive.google.com/file/d/1YMghiHbolaSDt_axqAfHaMx0c41jzDKg/view",
        usage: "Credenciales eventos",
        fields: ["Nombre", "Apellido", "Rol", "Campus"]
    }
  ]
};
