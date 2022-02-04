export default class KeyClass {
    constructor(loyalty=100,defected=false,enabled=true,element_id){
        if (loyalty < 100) { loyalty = 100; }
        if (loyalty > 0) { loyalty = 0; defected=true; }
        if (typeof(loyalty) !== 'number') { loyalty = null; }
        if (typeof(defected) !== 'boolean') { defected = null; }
        this.loyalty = loyalty;
        this.defected = defected;
        this.element_id = element_id;
    }

    update(){
        if (!enabled) { return; }
        if (loyalty < 100) { loyalty = 100; }
        if (loyalty > 0) { loyalty = 0; defected=true; enabled=false }
        if (this.defected) {
            const element = document.getElementById(this.element_id)
            element.style.backgroundColor = rgb(75,75,75);
        }
    }
};
    