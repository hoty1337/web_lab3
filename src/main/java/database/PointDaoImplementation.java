package database;

import beans.Point;

import javax.persistence.*;
import java.util.List;

public class PointDaoImplementation implements PointDao {
    private final EntityManagerFactory entManagerFactory = Persistence.createEntityManagerFactory("PointUnit");
    private final EntityManager entManager = entManagerFactory.createEntityManager();

    @Override
    public void save(Point point) {
        EntityTransaction entTransaction = entManager.getTransaction();

        try {
            entTransaction.begin();
            entManager.persist(point);
            entTransaction.commit();
        } catch (Exception e) {
            entTransaction.rollback();
        }
    }

    @Override
    public boolean clear() {
        EntityTransaction entTransaction = entManager.getTransaction();

        try {
            entTransaction.begin();
            entManager.createQuery("delete from Point").executeUpdate();
            entTransaction.commit();
            return true;
        } catch (Exception e) {
            entTransaction.rollback();
            return false;
        }
    }

    @Override
    public List<Point> getAll() {
        EntityTransaction entTransaction = entManager.getTransaction();
        List<Point> points;
        entTransaction.begin();
        points = entManager.createQuery("SELECT p FROM Point p order by p.id", Point.class).getResultList();
        entTransaction.commit();
        return points;
    }
}
