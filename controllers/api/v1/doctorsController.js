

// controller to register a doctor
export function create(req, res){
    return res.json(200, {
        message: 'List of doctors',
        doctors: []
    });
}
