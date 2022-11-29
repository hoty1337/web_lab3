package beans;

import javax.annotation.ManagedBean;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@ManagedBean
public class PointBean implements Serializable {

    private Point point;
    private List<Point> points;

    private EntityManagerFactory emFactory;
    private EntityManager em;
    private EntityTransaction transaction;

    public PointBean() {
        point = new Point();
        points = new ArrayList<>();

        connect();
        loadPoints();
    }

    private void connect() {
        emFactory = Persistence.createEntityManagerFactory("PointUnit");
        em = emFactory.createEntityManager();
        transaction = em.getTransaction();
    }

    private void loadPoints() {
        try {
            transaction.begin();
            points = em.createQuery("select p from Point p", Point.class).getResultList();
            transaction.commit();
        } catch (RuntimeException e) {
            if(transaction.isActive()) {
                transaction.rollback();
            }
            throw e;
        }
    }

    public boolean addPoint() {
        try {
            transaction.begin();
            point.checkHit();
            em.persist(point);
            points.add(point);
            point = new Point();
            transaction.commit();
        } catch (RuntimeException e) {
            if(transaction.isActive()) {
                transaction.rollback();
            }
            throw e;
        }
        return true;
    }

    public boolean clearPoints() {
        try {
            transaction.begin();
            em.createQuery("delete from Point").executeUpdate();
            points.clear();
            transaction.commit();
        } catch (RuntimeException e) {
            if(transaction.isActive()) {
                transaction.rollback();
            }
            throw e;
        }
        return true;
    }

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point p) {
        point = p;
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }
}
