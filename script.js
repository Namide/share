// Constants

var URL = window.location.href
var title = document.title
var description = document.querySelector('meta[name="description"]').getAttribute('content')
var shares = document.body.querySelector('#shares')
var detector = new MobileDetect(window.navigator.userAgent)
var isPhone = detector.phone()
var isIOS = detector.os() ? detector.os().toLowerCase() === 'ios' : false


// Helpers

function appendLink(title, URL, isTargetBlank = true)
{
    var li = document.createElement('li')

    var a = document.createElement('a')
    a.href = URL
    a.setAttribute('rel', 'noopener')

    if (isTargetBlank)
    {
        a.target = '_blank'
    }

    li.appendChild(a)

    var text = document.createTextNode(title)
    a.appendChild(text)

    shares.appendChild(li)

    return a
}

function usePopup(element, width = 450, height = 500)
{
    var URL = element.getAttribute('href')
    element.addEventListener('click', function(event)
    {
        window.open(URL, '_blank', 'height=' + height + ',width=' + width + ',menubar=no,status=no,titlebar=no')
        event.preventDefault()
    })

    return element
}


// Share functions

function addShareFacebook(sharedURL)
{
    var facebookShareURL = 'https://www.facebook.com/sharer/sharer.php?u='
    var URL = facebookShareURL + encodeURIComponent(sharedURL)
    var a = appendLink('Facebook share', URL)
    usePopup(a, 450, 500)
}

function addShareTwitter(sharedURL, title, description)
{
    var twitterShareURL = 'https://twitter.com/intent/tweet?text='
    var message = title + ': ' + description + ' ' + sharedURL
    var URL = twitterShareURL + encodeURIComponent(message)
    var a = appendLink('Twitter share', URL)
    usePopup(a, 450, 500)
}

function addShareGooglePlus(sharedURL)
{
    var googlePlusShareURL = 'https://plus.google.com/share?url='
    var URL = googlePlusShareURL + encodeURIComponent(sharedURL)
    var a = appendLink('Google+ share', URL)
    usePopup(a, 500, 640)
}

function addShareMail(sharedURL, title, description)
{
    var URL = 'mailto:'
        + '?subject=' + encodeURIComponent(title)
        + '&body=' + encodeURIComponent(description + ': \n' + sharedURL)
    
    appendLink('Share by email', URL, false)
}

function addShareSMS(sharedURL, title, description)
{
    if (isPhone)
    {
        var separator = isIOS ? '&' : '?'
        var URL = 'sms:'
            + separator + 'body=' + encodeURIComponent(title + ': ' + description + ' ' + sharedURL)
        
        appendLink('Share by SMS', URL, false)
    }
}

function addShareWhatsApp(sharedURL, title, description)
{
    var whatsAppShareURL
    var message = title + ': ' + description + ' ' + sharedURL

    if (isPhone)
    {
        whatsAppShareURL = 'whatsapp://send?text='
    }
    else
    {
        whatsAppShareURL = 'https://web.whatsapp.com/send?text='
    }

    var URL = whatsAppShareURL + encodeURIComponent('The Hunt for the Cheshire Cat: ' + message)
    appendLink('WhatsApp share', URL)
}


// Start

addShareFacebook(URL)
addShareTwitter(URL, title, description)
addShareGooglePlus(URL)
addShareMail(URL, title, description)
addShareWhatsApp(URL, title, description)
addShareSMS(URL, title, description)