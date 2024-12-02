export function scrollToElement(selector: string, offset = 80) {
  try {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`Element not found: ${selector}`);
      return false;
    }

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    return true;
  } catch (error) {
    console.error('Error scrolling to element:', error);
    return false;
  }
}

export function handleNavigation(event: React.MouseEvent<HTMLAnchorElement>, targetId: string) {
  event.preventDefault();
  
  if (targetId === 'pricing') {
    scrollToElement('#services .bg-white.rounded-xl.shadow-lg');
  } else {
    scrollToElement(`#${targetId}`);
  }
}