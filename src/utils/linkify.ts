const linkify = (text: string): string => {
  const linkRegex = /<a href=".+">(.+)<\/a>/g;

  if (linkRegex.test(text)) {
    return text;
  }
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  let linkedText = text.replace(urlRegex, function (url: string): string {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-indigo-500">${url}</a>`;
  });
  linkedText = linkedText.replace(/\n/g, "<br />");

  return linkedText;
};

export default linkify;
