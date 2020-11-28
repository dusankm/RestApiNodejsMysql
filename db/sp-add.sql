CREATE DEFINER=`root`@`localhost` PROCEDURE `inventoryAddEdit`(
	in _id int,
    in _name varchar(45),
    in _stock int
)
begin
	if _id = 0 then
		insert into inventory(name,stock)
        values (_name, _stock);
        set _id = last_insert_id();
	else
		update employees
        set
			name=_name,
            stock=_stock
            where id = _id;
    end if;
    select _id as id;
end