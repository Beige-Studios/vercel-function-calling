function generateOrderMessage(orderContents) {
  const menu = {
      "Sushi Rolls": {
          "BUYTMQH6IUPPW3WXJ3OXYTEA": { name: "California Roll", price: 8 },
          "TNWIMTY62WW752RP4M7WGQCF": { name: "Dragon Roll", price: 12 },
          "QE372W3V4AA4L5C3VL3P5MSD": { name: "Philadelphia Roll", price: 10 },
          "675TUUHYRAYLVYWU4HGCDQPU": { name: "Rainbow Roll", price: 14 },
          "FFWJWWD5VCACEKNSNUHO6CCQ": { name: "Spicy Tuna Roll", price: 9 }
      },
      "Specialty Rolls": {
          "R6T2H5PBLPTNBCL6UTWS453F": { name: "Firecracker Roll", price: 13 },
          "KQOZ37UV6PCTM577A4Z2VPLF": { name: "Golden Gate Roll", price: 15 },
          "BKUANCWTE3PJW7UTHVIGLUOA": { name: "Samurai Roll", price: 16 }
      },
      "Nigiri": {
          "N7SUEWD24CWPIGZENFMGQTHM": { name: "Eel Nigiri", price: 8 },
          "RCYLC6U6UN27BO4B4HMKG6XW": { name: "Salmon Nigiri", price: 6 },
          "W5TDMFCCHUKKA27J3I7HABI3": { name: "Shrimp Nigiri", price: 6 },
          "U2JWCYBBMS27GDLSDL7N2NTN": { name: "Tuna Nigiri", price: 7 }
      },
      "Vegetarian Rolls": {
          "BVUJJIFRSWPEDZM243GVMKXB": { name: "Avocado Roll", price: 5 },
          "D22LZDQNIIOO2O2CIPTFUQZE": { name: "Cucumber Roll", price: 5 },
          "PXR2MEJZLC6NSBFVTS5XE4TY": { name: "Vegetable Tempura Roll", price: 7 }
      },
      "Appetizers": {
          "6JOM34OOPNVTLPYSLU5WDI45": { name: "Edamame", price: 5 },
          "C7MJG67B4NNASLC2MZZQPCNO": { name: "Gyoza", price: 7 },
          "E2SX3MKWN4RMW2DZC7FZCTWT": { name: "Miso Soup", price: 4 }
      },
      "Beverages": {
          "XNXP7CJFWLA555DNQWUE7E7F": { name: "Japanese Green Tea, Hot", price: 3 },
          "S3SUTQTIJSGPV53FE55HK4LR": { name: "Japanese Green Tea, Cold", price: 3 },
          "LGEDHSSA3SEEYV6DA5U5HYYS": { name: "Sake", price: 24 },
          "OTO6WTEG5FTK3JIORU2V4V54": { name: "Soft Drink, Sprite", price: 2 },
          "H7OWLVG5QAV2JTADL4BVNJ4S": { name: "Soft Drink, Diet Coke", price: 2 },
          "WOUEDUAWSVNHQWH7KO4CPMLF": { name: "Soft Drink, Coke", price: 2 }
      }
  };

  let totalAmount = 0;
  let message = "🍣 Thank you for your order! 🍣\n\n";
  
  for (const [menuItem, items] of Object.entries(orderContents)) {
      message += `**${menuItem}**:\n`;
      for (const [itemId, quantity] of Object.entries(items)) {
          const { name, price } = menu[menuItem][itemId];
          const itemTotal = price * quantity;
          message += ` - ${name} x ${quantity}: $${itemTotal.toFixed(2)}\n`;
          totalAmount += itemTotal;
      }
      message += "\n";
  }

  message += `Total Amount: $${totalAmount.toFixed(2)}`;

  return message;
}

export default generateOrderMessage;
