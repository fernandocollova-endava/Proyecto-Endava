import React from 'react'

export default class Day extends React.Component {
    createTable(month, year) {
        let firstDay = (new Date(year, month)).getDay(); // PRIMER DIA DEL MES
        let lastDay = this.daysInMonth(month, year) // ULTIMO DIA DEL MES

        let date = 1; // INICIALIZA EL DIA A 1
        let table = []

        // Outer loop to create parent
        for (let i = 0; i < 6; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < 7; j++) {
                if (this.isInvisible(i, j, date, firstDay, lastDay)) { children.push(<td key={j}></td>) }
                else {
                    let id = date; // Guarda el Scope de la instancia
                    // Los eventos consulta solo si this.props.listHome .length es mayor a 0
                    children.push(
                        <td key={j} onClick={() => this.props.handleAddHome(id)}
                            className={
                                (this.props.birthDayList.length) && (this.isHappyBirthday(date) ? 'viewHB' : '') // Ejecuta el largo del arreglo es mayor a 0
                            }>
                            <p className={(this.isToday(date, month, year)) ? "classToday" : "classDay"} >{date}</p>
                            {((this.props.listHomeOffice).length) ? this.getUserEvents(date) : ''}
                        </td>)
                    date++
                }
            }
            //Create the parent and add the children
            if (!(i == 5 && date > lastDay)) { // Si la ultima columna esta vacia no la construye
                table.push(<tr key={i}>{children}</tr>)
            }
        }
        return table
    }
    daysInMonth(iMonth, iYear) {
        // Define el ultimo dia del mes
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }
    isToday(date, month, year) {
        const today = new Date();
        // Recibe el date actual y retorna si es el dia de hoy (true o false)
        return (date === today.getDate() && year === today.getFullYear() && month === today.getMonth())
    }
    isInvisible(i, j, date, firstDay, lastDay) {
        // Si es la primera fila y el dia es menor a el primer dia del mes
        return i === 0 && j < firstDay || date > lastDay
    }
    getUserEvents(date) {
        // Busca los eventos de cada dia
        let list = this.props.listHomeOffice
        return <>
            {
                list && list.map((item, i) => (
                    // Retorna si el dia coicide con el dia del home office cargado
                    (Number((item.date).split('-')[2]) == date) &&
                    <p key={i} className="viewEvent">{`${item.employeeHomeOffice.name} ${item.employeeHomeOffice.surname[0]}.`}</p>
                )
                )
            }

        </>
    }
    isHappyBirthday(date) {
        // Guarda la lista de cumpleaños del mes
        let list = this.props.birthDayList

        // Funcion de find para comparar vs el dia actual que construye el for (calendario)
        function search(data) {
            return Number(data.birthdayDate.slice(8, 10)) === date;
        }
        if ((list.find(search)) ) return true // Si encuentra mas de un cumpleaños lo retorna true ( agrega la clase )
        return false //Si no encuentra un cumpleaños lo retorna false ( no agrega la clase )
    }

    render() {
        return (
            <>
                {this.createTable(
                    this.props.currentMonth,
                    this.props.currentYear
                )}
            </>
        )
    }

}