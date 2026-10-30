// Script-tag embed for the AIBAN signup form. Owner: WS5 (route folder), reviewed by WS6 (+server rule).
// Static JavaScript only: no secrets, no backend calls. Owners paste:
//   <div data-aiban-subscribe data-configurator-id="..." data-news-source-id="..."></div>
//   <script async src="https://www.aiban.news/subscribe-widget/embed.js"></script>
// Optional attributes on the div: data-layout (full|compact), data-theme (auto|light|dark),
// data-accent (hex, no #), data-logo (0 hides it), data-lang, data-language, data-lead.
import type { RequestHandler } from '@sveltejs/kit';

const LOADER = `(function () {
  'use strict';
  var script = document.currentScript;
  var origin = 'https://www.aiban.news';
  try { if (script && script.src) origin = new URL(script.src).origin; } catch (e) {}
  var ATTRS = { configuratorId: 'configuratorId', newsSourceId: 'newsSourceId', layout: 'layout', theme: 'theme', accent: 'accent', logo: 'logo', lang: 'lang', language: 'language', lead: 'lead' };
  var frames = [];

  function mount(el) {
    if (el.getAttribute('data-aiban-ready')) return;
    var d = el.dataset;
    if (!d.configuratorId || !d.newsSourceId) {
      if (window.console) console.warn('[AIBAN] data-configurator-id and data-news-source-id are required.');
      return;
    }
    el.setAttribute('data-aiban-ready', '1');
    var q = new URLSearchParams();
    for (var key in ATTRS) { if (d[key]) q.set(ATTRS[key], d[key]); }
    var iframe = document.createElement('iframe');
    iframe.src = origin + '/subscribe-widget?' + q.toString();
    iframe.title = d.title || 'Newsletter signup form';
    iframe.loading = 'lazy';
    iframe.setAttribute('scrolling', 'no');
    iframe.style.cssText = 'display:block;width:100%;max-width:' + (d.maxWidth || '560px') + ';height:' + (d.layout === 'compact' ? '220px' : '460px') + ';border:0;background:transparent;color-scheme:normal;overflow:hidden;';
    el.appendChild(iframe);
    frames.push({ el: el, iframe: iframe });
  }

  function mountAll() {
    var nodes = document.querySelectorAll('[data-aiban-subscribe]');
    for (var i = 0; i < nodes.length; i++) mount(nodes[i]);
  }

  window.addEventListener('message', function (event) {
    if (event.origin !== origin) return;
    var data = event.data;
    if (!data || data.source !== 'aiban-subscribe') return;
    for (var i = 0; i < frames.length; i++) {
      var f = frames[i];
      if (f.iframe.contentWindow !== event.source) continue;
      if (data.type === 'resize' && typeof data.height === 'number' && data.height > 0 && data.height < 4000) {
        f.iframe.style.height = Math.ceil(data.height) + 'px';
      } else if (data.type === 'subscribed') {
        try { f.el.dispatchEvent(new CustomEvent('aiban:subscribed', { bubbles: true, detail: { language: data.language } })); } catch (e) {}
      }
    }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountAll);
  else mountAll();
  window.AIBAN = window.AIBAN || {};
  window.AIBAN.mountSubscribeForms = mountAll;
})();
`;

export const GET: RequestHandler = () =>
  new Response(LOADER, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    },
  });
