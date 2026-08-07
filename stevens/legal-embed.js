/* Embed mode for the Stevens legal pages.
 *
 * When these pages are rendered inside the app's layover card (?embed=1), the
 * app owns the chrome and the user must never be thrown out to a browser or
 * mail client. So, in embed mode only:
 *
 *   · the site crumb is hidden (the card has its own header)
 *   · links between the legal pages carry the flag forward, so they open in
 *     the same card, styled the same way
 *   · links that would leave the app keep their words but lose the link
 *   · mailto: addresses become tap-to-copy, with a confirmation
 *
 * Loaded synchronously so the crumb never flashes before it is hidden.
 * On the open web (no ?embed=1) this file does nothing at all.
 */
(function () {
  if (location.search.indexOf('embed') === -1) return;

  document.documentElement.className += ' embed';

  var style = document.createElement('style');
  style.textContent = [
    '.embed .crumb{display:none}',
    '.embed .page{padding-top:28px}',
    '.embed .copyable{font:inherit;color:var(--brass);font-weight:500;',
    '  background:none;border:0;padding:0;border-bottom:1px dashed currentColor;',
    '  cursor:pointer;-webkit-appearance:none}',
    '.embed .toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);',
    '  max-width:80%;background:var(--ink);color:#fff;padding:10px 16px;',
    '  border-radius:10px;font-size:14px;line-height:1.4;text-align:center;',
    '  opacity:0;transition:opacity .18s ease;pointer-events:none;z-index:99}',
    '.embed .toast.on{opacity:1}',
  ].join('');
  document.head.appendChild(style);

  var toastEl = null;
  var toastTimer = null;
  function toast(message) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('on'); }, 2600);
  }

  function copy(text) {
    function legacy() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* best effort */ }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(legacy);
    } else {
      legacy();
    }
  }

  function unlink(a) {
    var strong = document.createElement('strong');
    strong.textContent = a.textContent;
    a.parentNode.replaceChild(strong, a);
  }

  function makeCopyable(a, address) {
    // A real <button>, not a styled <span>: WebKit only guarantees click
    // events on natively interactive elements, and this runs inside the
    // app's WebView.
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copyable';
    btn.textContent = a.textContent;
    btn.addEventListener('click', function () {
      copy(address);
      toast('Copied ' + address);
    });
    a.parentNode.replaceChild(btn, a);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var href = a.getAttribute('href') || '';
      if (a.className.indexOf('crumb') !== -1) {
        // Site chrome — CSS hides it. Leave the anchor intact: unlinking it
        // would replace the element the rule targets and it would reappear.
        continue;
      }
      if (href.indexOf('/stevens/') === 0) {
        a.setAttribute('href', href + (href.indexOf('?') === -1 ? '?' : '&') + 'embed=1');
      } else if (href.indexOf('mailto:') === 0) {
        makeCopyable(a, href.slice(7).split('?')[0]);
      } else {
        unlink(a);
      }
    }
  });
})();
