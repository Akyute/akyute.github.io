(function () {
  var menu = document.getElementById('site-menu');
  var btn = document.getElementById('menu-btn');
  var contact = document.getElementById('contact-overlay');
  var key = document.body.getAttribute('data-page');
  menu.querySelectorAll('a').forEach(function (a) { if (a.dataset.page === key) a.classList.add('active'); });
  function openMenu() { menu.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
  function closeMenu() { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  function setContact(open) {
    contact.classList.toggle('open', open);
    contact.setAttribute('aria-hidden', String(!open));
    if (open) document.getElementById('cf-from').focus();
  }
  function closeContact() {
    if (document.body.hasAttribute('data-contact-page')) { window.location.href = '/'; return; }
    setContact(false);
  }
  btn.addEventListener('click', openMenu);
  menu.querySelector('.close').addEventListener('click', closeMenu);
  document.querySelectorAll('[data-contact]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); setContact(true); });
  });
  contact.querySelector('.cancel').addEventListener('click', closeContact);
  contact.addEventListener('click', function (e) { if (e.target === contact) closeContact(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenu(); if (contact.classList.contains('open')) closeContact(); }
  });
  document.getElementById('contact-panel').addEventListener('submit', function (e) {
    e.preventDefault();
    var from = document.getElementById('cf-from').value.trim();
    var msg = document.getElementById('cf-msg').value;
    var body = (from ? 'From: ' + from + '\n\n' : '') + msg;
    document.getElementById('cf-note').hidden = false;
    window.location.href = 'mailto:akyutecollective@gmail.com?subject=' + encodeURIComponent('Contact via akyute.com') + '&body=' + encodeURIComponent(body);
  });
  if (document.body.hasAttribute('data-contact-page')) setContact(true);
})();
