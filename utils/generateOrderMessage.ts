function generateOrderMessage(orderContents: { [key: string]: number }): string {
    const menu = {
        "BUYTMQH6IUPPW3WXJ3OXYTEA": { name: "California Roll", category: "Sushi Rolls", price: 8 },
        "TNWIMTY62WW752RP4M7WGQCF": { name: "Dragon Roll", category: "Sushi Rolls", price: 12 },
        "QE372W3V4AA4L5C3VL3P5MSD": { name: "Philadelphia Roll", category: "Sushi Rolls", price: 10 },
        "675TUUHYRAYLVYWU4HGCDQPU": { name: "Rainbow Roll", category: "Sushi Rolls", price: 14 },
        "FFWJWWD5VCACEKNSNUHO6CCQ": { name: "Spicy Tuna Roll", category: "Sushi Rolls", price: 9 },
        "R6T2H5PBLPTNBCL6UTWS453F": { name: "Firecracker Roll", category: "Specialty Rolls", price: 13 },
        "KQOZ37UV6PCTM577A4Z2VPLF": { name: "Golden Gate Roll", category: "Specialty Rolls", price: 15 },
        "BKUANCWTE3PJW7UTHVIGLUOA": { name: "Samurai Roll", category: "Specialty Rolls", price: 16 },
        "N7SUEWD24CWPIGZENFMGQTHM": { name: "Eel Nigiri", category: "Nigiri", price: 8 },
        "RCYLC6U6UN27BO4B4HMKG6XW": { name: "Salmon Nigiri", category: "Nigiri", price: 6 },
        "W5TDMFCCHUKKA27J3I7HABI3": { name: "Shrimp Nigiri", category: "Nigiri", price: 6 },
        "U2JWCYBBMS27GDLSDL7N2NTN": { name: "Tuna Nigiri", category: "Nigiri", price: 7 },
        "BVUJJIFRSWPEDZM243GVMKXB": { name: "Avocado Roll", category: "Vegetarian Rolls", price: 5 },
        "D22LZDQNIIOO2O2CIPTFUQZE": { name: "Cucumber Roll", category: "Vegetarian Rolls", price: 5 },
        "PXR2MEJZLC6NSBFVTS5XE4TY": { name: "Vegetable Tempura Roll", category: "Vegetarian Rolls", price: 7 },
        "6JOM34OOPNVTLPYSLU5WDI45": { name: "Edamame", category: "Appetizers", price: 5 },
        "C7MJG67B4NNASLC2MZZQPCNO": { name: "Gyoza", category: "Appetizers", price: 7 },
        "E2SX3MKWN4RMW2DZC7FZCTWT": { name: "Miso Soup", category: "Appetizers", price: 4 },
        "XNXP7CJFWLA555DNQWUE7E7F": { name: "Japanese Green Tea, Hot", category: "Beverages", price: 3 },
        "S3SUTQTIJSGPV53FE55HK4LR": { name: "Japanese Green Tea, Cold", category: "Beverages", price: 3 },
        "LGEDHSSA3SEEYV6DA5U5HYYS": { name: "Sake", category: "Beverages", price: 24 },
        "OTO6WTEG5FTK3JIORU2V4V54": { name: "Soft Drink, Sprite", category: "Beverages", price: 2 },
        "H7OWLVG5QAV2JTADL4BVNJ4S": { name: "Soft Drink, Diet Coke", category: "Beverages", price: 2 },
        "WOUEDUAWSVNHQWH7KO4CPMLF": { name: "Soft Drink, Coke", category: "Beverages", price: 2 }
    };

    let totalAmount = 0;
    let message = "🍣 Thank you for your order! 🍣\n\n";

    for (const [sku, quantity] of Object.entries(orderContents)) {
        const menuItem = menu[sku];
        if (menuItem) {
            const { name, category, price } = menuItem;
            const itemTotal = price * quantity;
            message += `**${category}**:\n`;
            message += ` - ${name} x ${quantity}: $${itemTotal.toFixed(2)}\n`;
            totalAmount += itemTotal;
        }
    }

    message += `\nTotal Amount: $${totalAmount.toFixed(2)}`;

    return message;
}

export default generateOrderMessage;