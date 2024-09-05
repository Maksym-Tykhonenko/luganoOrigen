const topics = [
    {
        name: "Geography and Nature",
        questions: [
          {
            question: "Lugano is located in the Italian-speaking part of Switzerland.",
            answer: true,
          },
          {
            question: "Lugano is the capital city of the Canton of Ticino.",
            answer: false,
          },
          {
            question: "Lake Lugano borders both Switzerland and Italy.",
            answer: true,
          },
          {
            question: "Monte Brè is the highest mountain in Lugano.",
            answer: false,
          },
          {
            question: "Parco Ciani is the largest park in Lugano.",
            answer: true,
          },
          {
            question: "Lake Lugano is an artificial body of water.",
            answer: false,
          },
          {
            question: "The climate in Lugano is considered subtropical.",
            answer: true,
          },
          {
            question: "Lugano has one of Switzerland`s largest glaciers.",
            answer: false,
          },
          {
            question: "Lugano is located on the shore of Lake Como.",
            answer: false,
          },
          {
            question: "The city is surrounded by the Alps.",
            answer: true,
          },
        ],
        fact: "Lugano is located on the shores of the eponymous lake, which not only gives the city its picturesque appearance but also plays a key role in its ecosystem. Lake Lugano stretches across both Swiss and Italian territories. Around the lake are scenic parks and green areas, as well as majestic mountains like Monte Brè and Monte San Salvatore, offering stunning views and opportunities for outdoor activities.",
        image: require('../quiz-images/image1.jpg')
      },
      {
        name: "History",
        questions: [
          {
            question: "Lugano was founded in the 10th century.",
            answer: false,
          },
          {
            question: "In 1513, Lugano became part of the Swiss Confederation.",
            answer: true,
          },
          {
            question: "Lugano was occupied by the French in the early 19th century.",
            answer: true,
          },
          {
            question: "In the Middle Ages, Lugano was an important trade center.",
            answer: true,
          },
          {
            question: "Lugano has always belonged to Switzerland since its founding.",
            answer: false,
          },
          {
            question: "In 1848, Lugano became part of the newly formed Canton of Ticino.",
            answer: true,
          },
          {
            question: "Lugano experienced a major earthquake in the 20th century.",
            answer: false,
          },
          {
            question: "In 1900, Lugano was granted city status.",
            answer: false,
          },
          {
            question: "Lugano has ancient Roman roots.",
            answer: true,
          },
          {
            question: "Lugano was an important religious center in the Middle Ages.",
            answer: true,
          },
        ],
        fact: "In the early 16th century, Lugano was a strategic trading and military post. The city was initially part of the Duchy of Milan and then joined the Swiss Confederation in 1513. This transition was a significant step in strengthening Switzerland’s position in the region and contributed to Lugano's growth as a trading and cultural hub.",
        image: require('../quiz-images/image2.jpg')
      },
      {
        name: "Culture and Art",
        questions: [
          {
            question: "An annual film festival is held in Lugano.",
            answer: true,
          },
          {
            question: "The Museum of Cultures in Lugano is located in a former monastery.",
            answer: true,
          },
          {
            question: "The Lugano Theater is one of the oldest in Switzerland.",
            answer: false,
          },
          {
            question: "Lugano is known for its art galleries.",
            answer: true,
          },
          {
            question: "The 'Blues to Bop' music festival is held annually in Lugano.",
            answer: true,
          },
          {
            question: "There is no opera house in Lugano.",
            answer: false,
          },
          {
            question: "Palazzo Civico is the main concert venue in Lugano.",
            answer: true,
          },
          {
            question: "The National Library of Switzerland is located in Lugano.",
            answer: false,
          },
          {
            question: "Contemporary art exhibitions are often held in Lugano.",
            answer: true,
          },
          {
            question: "Annual carnivals are held in Lugano.",
            answer: true,
          },
        ],
        fact: 'Lugano is renowned for its cultural events, with one of the most famous being the "Festa della Madonna". Held every August, this festival attracts thousands of tourists with its lively performances, street parades, and traditional Italian dishes. During this time, the city is filled with music, art, and joy, making its cultural life particularly vibrant.',
        image: require('../quiz-images/image3.jpg')
      },
      {
        name: "Economy and Business",
        questions: [
          {
            question: "Lugano is the largest financial center in Ticino.",
            answer: true,
          },
          {
            question: "The main economy of Lugano is based on agriculture.",
            answer: false,
          },
          {
            question: "Offices of many international banks are located in Lugano.",
            answer: true,
          },
          {
            question: "Tourism is an important part of Lugano's economy.",
            answer: true,
          },
          {
            question: "Lugano is known for its wineries.",
            answer: false,
          },
          {
            question: "Lugano is a high-tech hub in Switzerland.",
            answer: false,
          },
          {
            question: "An annual real estate fair is held in Lugano.",
            answer: true,
          },
          {
            question: "The headquarters of the World Trade Organization is located in Lugano.",
            answer: false,
          },
          {
            question: "The real estate market in Lugano is one of the most expensive in Switzerland.",
            answer: true,
          },
          {
            question: "Lugano is the main port on Lake Lugano.",
            answer: true,
          },
        ],
        fact: "Lugano became a financial center of Switzerland due to its stable economic environment and advantageous location. In the mid-20th century, the city attracted numerous international banks and financial institutions, helping to develop it as a key center for finance and business. This status continues to this day, making Lugano an important player on the international stage.",
        image: require('../quiz-images/image4.jpg')
      },
      {
        name: "Education and Science",
        questions: [
          {
            question: "The University of Italian Switzerland is located in Lugano.",
            answer: true,
          },
          {
            question: "There are no research institutes in Lugano.",
            answer: false,
          },
          {
            question: "The University of Lugano is the largest in the Canton of Ticino.",
            answer: true,
          },
          {
            question: "One of the largest libraries in Switzerland is located in Lugano.",
            answer: true,
          },
          {
            question: "International scientific conferences are held in Lugano.",
            answer: true,
          },
          {
            question: "There are no medical universities in Lugano.",
            answer: false,
          },
          {
            question: "The University of Lugano is known for its business programs.",
            answer: true,
          },
          {
            question: "The Swiss Federal Institute of Technology is located in Lugano.",
            answer: false,
          },
          {
            question: "Students from all over the world study in Lugano.",
            answer: true,
          },
          {
            question: "There are no schools in Lugano that teach in English.",
            answer: false,
          },
        ],
        fact: "The University of Italian Switzerland, located in Lugano, was founded in 1996 and has become an important educational and research center. It offers a variety of programs in Italian and attracts students and scholars from around the world, creating a multicultural educational environment and promoting scientific research in various fields.",
        image: require('../quiz-images/image5.jpg')
      },
      {
        name: "Tourism and Recreation",
        questions: [
          {
            question: "Lugano welcomes over a million tourists annually.",
            answer: true,
          },
          {
            question: "There are no water parks in Lugano.",
            answer: false,
          },
          {
            question: "Ski resorts are located near Lugano.",
            answer: true,
          },
          {
            question: "You can do water sports on the lake in Lugano.",
            answer: true,
          },
          {
            question: "There are numerous hiking trails in Lugano.",
            answer: true,
          },
          {
            question: "Lugano has no beaches.",
            answer: false,
          },
          {
            question: "Golf clubs are popular among tourists in Lugano.",
            answer: true,
          },
          {
            question: "There are no yacht clubs in Lugano.",
            answer: false,
          },
          {
            question: "An annual hot air balloon festival is held in Lugano.",
            answer: false,
          },
          {
            question: "There is a casino in Lugano.",
            answer: true,
          },
        ],
        fact: 'Lugano attracts tourists with its natural beauty and recreational activities. One popular attraction is the "Parco Ciani," a magnificent park with green lawns, ancient trees, and picturesque pathways. Visitors and locals come here to enjoy walks, picnics, and relaxing days in nature.',
        image: require('../quiz-images/image6.jpg')
      },
      {
        name: "Transport and Infrastructure",
        questions: [
          {
            question: "There is an international airport in Lugano.",
            answer: true,
          },
          {
            question: "There is no railway service in Lugano.",
            answer: false,
          },
          {
            question: "Lugano has a well-developed public transportation system.",
            answer: true,
          },
          {
            question: "Buses in Lugano are free for tourists.",
            answer: false,
          },
          {
            question: "There are high-speed trains from Lugano to Zurich.",
            answer: true,
          },
          {
            question: "There are no bicycle lanes in Lugano.",
            answer: false,
          },
          {
            question: "There are ferry crossings across the lake in Lugano.",
            answer: true,
          },
          {
            question: "Taxis in Lugano are expensive compared to other Swiss cities.",
            answer: true,
          },
          {
            question: "There is a tram network in Lugano.",
            answer: false,
          },
          {
            question: "Car-sharing systems are popular in Lugano.",
            answer: true,
          },
        ],
        fact: 'In 2010, Lugano opened the "Lugano-Ponte Tresa Railway," connecting the city with nearby regions and improving transportation and accessibility. This project was an important step in the city’s infrastructure development, facilitating ease of movement and supporting economic growth.',
        image: require('../quiz-images/image7.jpg')
      },
      {
        name: "Cuisine and Gastronomy",
        questions: [
          {
            question: "Lugano is famous for its Swiss cuisine.",
            answer: true,
          },
          {
            question: "You can try traditional Italian gelato in Lugano.",
            answer: true,
          },
          {
            question: "There are no Michelin-starred restaurants in Lugano.",
            answer: false,
          },
          {
            question: "Seafood dishes are popular in Lugano.",
            answer: true,
          },
          {
            question: "There are no wine festivals in Lugano.",
            answer: false,
          },
          {
            question: "You can try traditional Swiss cheeses in Lugano.",
            answer: true,
          },
          {
            question: "Truffle dishes are popular in Lugano.",
            answer: true,
          },
          {
            question: "There are no fresh produce markets in Lugano.",
            answer: false,
          },
          {
            question: "You can find Italian cuisine restaurants in Lugano.",
            answer: true,
          },
          {
            question: "Street food is popular in Lugano.",
            answer: true,
          },
        ],
        fact: 'Lugano is known for its gastronomic culture, including the "Ristorante Grotto della Salute," which offers traditional Swiss and Italian dishes. This establishment attracts food enthusiasts with its delicious cheeses, fresh seafood, and homemade pastas, creating a unique culinary experience for locals and tourists alike.',
        image: require('../quiz-images/image8.jpg')
      },
      {
        name: "Sports and Outdoor Activities",
        questions: [
          {
            question: "There is a professional football team in Lugano.",
            answer: true,
          },
          {
            question: "International tennis tournaments are held in Lugano.",
            answer: true,
          },
          {
            question: "There are no indoor sports arenas in Lugano.",
            answer: false,
          },
          {
            question: "Water sports are popular in Lugano.",
            answer: true,
          },
          {
            question: "There are no opportunities for mountain hiking in Lugano.",
            answer: false,
          },
          {
            question: "Marathons and running competitions are held in Lugano.",
            answer: true,
          },
          {
            question: "There are no sports schools in Lugano.",
            answer: false,
          },
          {
            question: "There are golf clubs in Lugano.",
            answer: true,
          },
          {
            question: "You can ride bicycles around the city in Lugano.",
            answer: true,
          },
          {
            question: "There are no sporting events for children in Lugano.",
            answer: false,
          },
        ],
        fact: 'Lugano actively supports sporting events and offers a variety of opportunities for outdoor activities. The "Lugano Tennis Club" is one of the leading tennis clubs in the region, hosting international tournaments and competitions. The city is also known for its scenic mountain bike trails and ski resorts in the surrounding areas.',
        image: require('../quiz-images/image9.jpg')
      },
      {
        name: "Life in Lugano",
        questions: [
          {
            question: "Lugano is considered one of the most expensive cities in Switzerland.",
            answer: true,
          },
          {
            question: "Lugano has a high standard of living.",
            answer: true,
          },
          {
            question: "There are no private schools in Lugano.",
            answer: false,
          },
          {
            question: "Lugano has a low crime rate.",
            answer: true,
          },
          {
            question: "There are no universities in Lugano.",
            answer: false,
          },
          {
            question: "Lakefront living is popular in Lugano.",
            answer: true,
          },
          {
            question: "Lugano has a well-developed healthcare system.",
            answer: true,
          },
          {
            question: "There are no shopping centers in Lugano.",
            answer: false,
          },
          {
            question: "Lugano has high employment rates.",
            answer: true,
          },
          {
            question: "There are no entertainment options for young people in Lugano.",
            answer: false,
          },
        ],
        fact: "Lugano is renowned for its high quality of life and is considered one of the most comfortable and pleasant cities in Switzerland. The city offers excellent living conditions due to its high level of safety, developed infrastructure, and picturesque surroundings. Residents appreciate the tranquility, cleanliness, and quality of services, making life in Lugano enjoyable and comfortable.",
        image: require('../quiz-images/image10.jpg')
      },
  ];

export default topics;