const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// mongodb
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://zmh:321321@cluster0.h1yphvc.mongodb.net/test", {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("db connected."));

const DataSchema = require("./data");

// end

// const host = '0.0.0.0'
const port = 3000;

// app.set('Host', host)
app.set("Port", port);
app.get("/", async (req, res) => {
  res.json({ msg: "Hello world" });
});

io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("message", async (msg) => {
    const data = new DataSchema({
      num: Math.floor(Math.random() * 1000),
      plot:
        "Gwen's family is rich, but her parents ignore her and most of the servants push her around, so she is lonely and unhappy. Her father is concerned only with making money, and her mother ...",
      genres: ["Comedy", "Drama", "Family"],
      runtime: {
        $numberInt: "65"
      },
      cast: [
        "Mary Pickford",
        "Madlaine Traverse",
        "Charles Wellesley",
        "Gladys Fairbanks"
      ],
      title: "The Poor Little Rich Girl",
      fullplot:
        "Gwen's family is rich, but her parents ignore her and most of the servants push her around, so she is lonely and unhappy. Her father is concerned only with making money, and her mother cares only about her social position. But one day a servant's irresponsibility creates a crisis that causes everyone to rethink what is important to them.",
      languages: ["English"],
      released: {
        $date: {
          $numberLong: "-1667088000000"
        }
      },
      directors: ["Maurice Tourneur"],
      writers: ["Eleanor Gates (play)", "Frances Marion (scenario)"],
      awards: {
        wins: {
          $numberInt: "1"
        },
        nominations: {
          $numberInt: "0"
        },
        text: "1 win."
      },
      lastupdated: "2015-07-27 00:11:31.387000000",
      year: {
        $numberInt: "1917"
      },
      imdb: {
        rating: {
          $numberDouble: "6.9"
        },
        votes: {
          $numberInt: "884"
        },
        id: {
          $numberInt: "8443"
        }
      },
      countries: ["USA"],
      type: "movie",
      tomatoes: {
        viewer: {
          rating: {
            $numberDouble: "3.9"
          },
          numReviews: {
            $numberInt: "137"
          },
          meter: {
            $numberInt: "77"
          }
        },
        production: "Artcraft",
        lastUpdated: {
          $date: {
            $numberLong: "1440180025000"
          }
        }
      },
      num_mflix_comments: {
        $numberInt: "0"
      }
    });
    let res = null;
    res = await data.save();
    // let count = await data.find();
    console.log(res.num);
    if (res) {
      io.emit("message", msg);
    }
  });

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log("server is running");
});

// setInterval(autoLoop, 2000);

// async function autoLoop() {
//   await data.save();
//   console.log("Saved");
// }
