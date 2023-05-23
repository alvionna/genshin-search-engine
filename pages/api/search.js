export default async function handler (req, res) { 
    const { query } = req.query;

    try { 
        const encodedSearchQuery = encodeURI(query)

        if (typeof query !== "string") {
            throw new Error("Invalid request")
        }

        const response = await fetch(`http://127.0.0.1:8000/api/search?query=${encodedSearchQuery}`);
        const data = await response.json();

        res.status(200).json(data);

            
    } catch(error) { 
        res.status(500).end()
    }
}
