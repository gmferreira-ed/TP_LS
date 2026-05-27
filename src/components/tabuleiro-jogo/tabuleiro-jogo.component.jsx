import { useState } from "react";

function TabuleiroJogo() {
    
    const [checked, setChecked] = useState(false);

    return(
        <div>
            <p>Tabuleiro De jogo</p>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
        </div>
    );
}

export default TabuleiroJogo;
