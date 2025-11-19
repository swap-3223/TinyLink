import {pool} from '../db.js'

function generateCode(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

const createLink = async(req,res)=>{
    try {
        const {url,code} = req.body;

        if(!url || !url.startsWith('http')){
            return res.status(400).json({ error: "Invalid URL" });
        }
        if (code && (code.length < 6 || code.length > 8)) {
      return res.status(400).json({
        error: "Code must be 6 to 8 characters long"
      });
    }

        let finalCode = code || generateCode(6);

        const exists = await pool.query(
        "SELECT * FROM links WHERE code = $1",
        [finalCode]
        );
        if (exists.rowCount > 0) {
        return res.status(409).json({ error: "Code already exists" });
        }

    await pool.query(
      "INSERT INTO links (code, url) VALUES ($1, $2)",
      [finalCode, url]
    );

    res.json({
      message: "Short link created",
      code: finalCode,
      shortUrl: `${process.env.BASE_URL}/${finalCode}`
    });
    } catch (err) {
    console.error("Error creating link", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllLinks = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM  links')
        res.json({
            count:result.rowCount,
            links:result.rows
        })
    } catch (err) {
    console.error("Error fetching links", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getLinkByCode = async (req,res)=>{
    try {
        const {code} = req.params;
        const result = await pool.query('SELECT * FROM links WHERE code = $1',[code])
        
        if(result.rowCount === 0){
            return res.status(404).json({error:"Link not found"})
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error("Error fetching stats", error);
    res.status(500).json({ error: "Server error" });
    }
}

const deleteLink = async(req,res)=>{
    try {
        const {code} = req.params;
        const result = await pool.query('DELETE FROM links WHERE code = $1',[code])

         if (result.rowCount === 0) {
      return res.status(404).json({ error: "Link not found" });
    }

    res.json({ message: "Link deleted successfully" });

  } catch (error) {
    console.error("Error deleting link", error);
    res.status(500).json({ error: "Server error" });
  }
};

const redirectLink = async(req,res)=>{
    try {
        const {code} = req.params;
        const result = await pool.query('SELECT * FROM links WHERE code = $1',[code])

        if(result.rowCount === 0){
            return res.status(404).json({error:"Link not found"})
        }

        const link = result.rows[0]

        await pool.query('UPDATE links SET  clicks = clicks + 1, last_clicked = Now() WHERE code = $1',[code])
    
        return res.redirect(link.url)
    } catch (error) {
        console.log("Error redirecting link",error)
        return res.status(500).json({error:"Server error"})
    }
}
export {getAllLinks, getLinkByCode, createLink, deleteLink, redirectLink}