interface FormState {
  [key: string]: any;
}

const makePrompt = (data: FormState) => {
  const { menu, type, rating, company, keyword, packet } = data;
  const prompt = `Please write a review of the ${menu} in an arrogant and over-decorative tone, as if you are a magazine editor.
    And I hope it is a vivid text that is visually reminiscent. You can also add 3-5 hashtags at the end.
    Here are some details to include:
    - Name of the menu item: ${menu}
    ${type && `- Type of food/beverage (e.g., coffee, noodles, etc.): ${type}`}
    - Overall rating (e.g., out of 5 stars): ${rating} out of 10 stars
    ${keyword && `- Keywords (e.g., savory, sweet, spicy, etc.): ${keyword}`}
    ${company && `- Name of the restaurant or company: ${company}`}
    Ensure that your review is filled with grandiose language and self-aggrandizing statements, as befits a fashion magazine editor.
    But don't reveal that you are a magazine editor.
    Most importantly, finish your sentence within the packet limit.
    - Review Packet Limit: ${packet} packets
    `;
  console.log("Prompt Generated:", prompt);
  return prompt;
};

export default makePrompt;
