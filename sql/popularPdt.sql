/*
SELECT `item` , sum( `qty` )
FROM `purchases`
GROUP BY item
ORDER BY sum( qty ) DESC
LIMIT 0 , 1

*/

SELECT SUM(no_sold) as totalqty, name
FROM sales s
INNER JOIN products p
ON s.prod_id = p.id
GROUP BY name
ORDER BY SUM(no_sold) DESC
LIMIT 0, 1
