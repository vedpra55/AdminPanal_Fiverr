import dbConnect from "@/config/mongodb";
import Theme from "@/models/theme";

dbConnect();
export default async function handler(req, res) {
  if (req.method === "GET") {
    const theme = await Theme.find({});
    res.status(200).json({ theme });
  }
  if (req.method === "PUT") {
    const {
      buttonColorValue,
      buttonColorName,
      addDataIcon,
      editDataIcon,
      deleteDataIcon,
      saveIcon,
      makeAdminIcon,
      homeIcon,
      dataIcon,
      adminIcon,
      helpIcon,
      aboutIcon,
      userIcon,
      logoutIcon,
      logo,
      loginIcon,
    } = req.body;

    const id = "63e9e8286b804b19af03ec8b";

    await Theme.updateOne(
      { _id: id },
      {
        buttonValue: buttonColorValue,
        buttonName: buttonColorName,
        addDataIcon,
        editDataIcon,
        deleteDataIcon,
        saveIcon,
        makeAdminIcon,
        homeIcon,
        dataIcon,
        adminIcon,
        helpIcon,
        aboutIcon,
        userIcon,
        logoutIcon,
        logo,
        loginIcon,
      }
    );

    res.status(200).json({ data: "updated" });
  }

  if (req.method === "POST") {
    const data = await Theme.create({
      buttonValue: "#0000FF",
      buttonName: "blue",
      helpIcon: "https://img.icons8.com/ios/500/help--v1.png",
      aboutIcon: "https://static.thenounproject.com/png/2508117-200.png",
      userIcon:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      logoutIcon: "https://cdn-icons-png.flaticon.com/512/2767/2767155.png",
      homeIcon: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png",
      dataIcon:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSutOkc-86ImALH9iF9Z0CzWk0ozeZB1xYhjQ&usqp=CAU",
      adminIcon:
        "https://w7.pngwing.com/pngs/429/434/png-transparent-computer-icons-icon-design-business-administration-admin-icon-hand-monochrome-silhouette-thumbnail.png",
      addDataIcon: "https://cdn-icons-png.flaticon.com/512/32/32339.png",
      editDataIcon:
        "https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png",
      deleteDataIcon: "https://cdn-icons-png.flaticon.com/512/3405/3405244.png",
      makeAdminIcon:
        "https://e7.pngegg.com/pngimages/1011/702/png-clipart-computer-icons-graphics-iconfinder-administrator-icon-monochrome-black.png",
      saveIcon:
        "https://w7.pngwing.com/pngs/860/512/png-transparent-instagram-social-media-save-instagram-instagram-save-social-media-logo-icon-thumbnail.png",
      logo: "https://invoice-generator-amber.vercel.app/_next/image?url=%2Fassets%2Flogo.png&w=384&q=75",
      loginIcon: "https://cdn-icons-png.flaticon.com/512/152/152533.png",
    });
    res.status(200).json({ data: data });
  }
}
